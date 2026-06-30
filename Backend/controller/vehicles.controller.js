import multer from "multer";
import path from "path";
import fs from "fs";
import Vehicle from "../model/vehicles.model.js";

// Ensure uploads directory exists
const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// store uploads on disk and keep only the path in DB
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

const registerVehicle = async (req, res) => {
  try {
    const {
      VehiclesName,
      VehiclesModel,
      VehiclesYear,
      VehiclesType,
      VehiclesWheel,
      VehiclesEngine,
      VehiclesAcceleration,
      VehiclesTopspeed,
      VehiclesSeat,
      VehiclesColor,
      VehiclesPrice,
      VehiclesDetails,
    } = req.body;
    // multer places the uploaded file in `req.file`
    const file = req.file;
    if (
      !VehiclesName ||
      !VehiclesModel ||
      !VehiclesYear ||
      !VehiclesType ||
      !VehiclesWheel ||
      !VehiclesEngine ||
      !VehiclesAcceleration ||
      !VehiclesTopspeed ||
      !VehiclesSeat ||
      !VehiclesColor ||
      !VehiclesPrice ||
      !VehiclesDetails ||
      !file
    ) {
      return res
        .status(400)
        .json({ message: "All fields and an image file are required" });
    }

    const existingVehicle = await Vehicle.findOne({ VehiclesName });
    if (existingVehicle) {
      return res.status(400).json({ message: "Vehicle already exists" });
    }

    const storedPath = `/uploads/${file.filename}`;

    const newVehicle = await Vehicle.create({
      Path: storedPath,
      ImageName: file.filename,
      VehiclesName,
      VehiclesModel,
      VehiclesYear,
      VehiclesCategory,
      VehiclesType,
      VehiclesWheel,
      VehiclesEngine,
      VehiclesAcceleration,
      VehiclesTopspeed,
      VehiclesSeat,
      VehiclesColor,
      VehiclesPrice,
      VehiclesDetails,
    });

    res.status(201).json({
      message: "Vehicle registered successfully",
      vehicle: newVehicle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json({ vehicles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({ vehicle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildSearchableText = (vehicle) =>
  [
    vehicle.VehiclesName,
    vehicle.VehiclesModel,
    vehicle.VehiclesCategory,
    vehicle.VehiclesType,
    vehicle.VehiclesColor,
    vehicle.VehiclesDetails,
    vehicle.VehiclesEngine,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const scoreRecommendation = (candidate, references, queryTokens) => {
  let score = 0;

  for (const ref of references) {
    if (candidate._id.toString() === ref._id.toString()) {
      return -1;
    }

    if (candidate.VehiclesCategory === ref.VehiclesCategory) score += 4;
    if (candidate.VehiclesType === ref.VehiclesType) score += 3;
    if (candidate.VehiclesWheel === ref.VehiclesWheel) score += 2;

    const candidatePrice = parseFloat(candidate.VehiclesPrice) || 0;
    const refPrice = parseFloat(ref.VehiclesPrice) || 0;
    const avgPrice = (candidatePrice + refPrice) / 2;

    if (avgPrice > 0) {
      const priceDiffRatio = Math.abs(candidatePrice - refPrice) / avgPrice;
      if (priceDiffRatio <= 0.15) score += 3;
      else if (priceDiffRatio <= 0.3) score += 1;
    }

    if (candidate.VehiclesSeat === ref.VehiclesSeat) score += 1;
  }

  const searchable = buildSearchableText(candidate);
  for (const token of queryTokens) {
    if (searchable.includes(token)) score += 2;
  }

  return score;
};

const getRecommendations = (allVehicles, searchResults, query, limit = 6) => {
  const excludeIds = new Set(searchResults.map((vehicle) => vehicle._id.toString()));
  const queryTokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const references = searchResults.length > 0 ? searchResults.slice(0, 3) : [];

  const candidates = allVehicles.filter(
    (vehicle) => !excludeIds.has(vehicle._id.toString()),
  );

  const scored = candidates
    .map((vehicle) => ({
      vehicle,
      score: scoreRecommendation(vehicle, references, queryTokens),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (scored.length < limit && queryTokens.length > 0) {
    const existingIds = new Set([
      ...excludeIds,
      ...scored.map(({ vehicle }) => vehicle._id.toString()),
    ]);

    const fallback = candidates
      .filter((vehicle) => !existingIds.has(vehicle._id.toString()))
      .map((vehicle) => ({
        vehicle,
        score: queryTokens.reduce(
          (acc, token) =>
            acc + (buildSearchableText(vehicle).includes(token) ? 1 : 0),
          0,
        ),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);

    for (const item of fallback) {
      if (scored.length >= limit) break;
      scored.push(item);
    }
  }

  if (scored.length < limit) {
    const existingIds = new Set([
      ...excludeIds,
      ...scored.map(({ vehicle }) => vehicle._id.toString()),
    ]);

    for (const vehicle of candidates) {
      if (scored.length >= limit) break;
      if (!existingIds.has(vehicle._id.toString())) {
        scored.push({ vehicle, score: 0 });
      }
    }
  }

  return scored.map(({ vehicle }) => vehicle);
};

const searchVehicles = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !String(q).trim()) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const query = String(q).trim();
    const regex = new RegExp(escapeRegex(query), "i");

    const vehicles = await Vehicle.find({
      $or: [
        { VehiclesName: regex },
        { VehiclesModel: regex },
        { VehiclesCategory: regex },
        { VehiclesType: regex },
        { VehiclesColor: regex },
        { VehiclesDetails: regex },
        { VehiclesEngine: regex },
      ],
    });

    const allVehicles = await Vehicle.find();
    const recommendations = getRecommendations(allVehicles, vehicles, query);

    res.status(200).json({
      query,
      vehicles,
      recommendations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const tokenize = (text) =>
  String(text || "")
    .toLowerCase()
    .split(/[\s,_-]+/)
    .filter(Boolean);

const buildVehicleFeatureSet = (vehicle) => {
  const features = new Set();

  const addField = (key, value) => {
    if (value) {
      features.add(`${key}:${String(value).toLowerCase()}`);
    }
  };

  addField("category", vehicle.VehiclesCategory);
  addField("type", vehicle.VehiclesType);
  addField("wheel", vehicle.VehiclesWheel);
  addField("engine", vehicle.VehiclesEngine);
  addField("color", vehicle.VehiclesColor);
  addField("seat", vehicle.VehiclesSeat);
  addField("year", vehicle.VehiclesYear);
  addField("acceleration", vehicle.VehiclesAcceleration);
  addField("topspeed", vehicle.VehiclesTopspeed);

  tokenize(vehicle.VehiclesName).forEach((token) =>
    features.add(`name:${token}`),
  );
  tokenize(vehicle.VehiclesModel).forEach((token) =>
    features.add(`model:${token}`),
  );
  tokenize(vehicle.VehiclesDetails).forEach((token) =>
    features.add(`detail:${token}`),
  );

  const price = parseFloat(vehicle.VehiclesPrice) || 0;
  if (price > 0) {
    if (price < 50) features.add("price:budget");
    else if (price < 100) features.add("price:mid");
    else features.add("price:premium");
  }

  return features;
};

const jaccardSimilarity = (setA, setB) => {
  if (setA.size === 0 && setB.size === 0) {
    return 0;
  }

  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) {
      intersection++;
    }
  }

  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
};

const getSimilarVehicles = (sourceVehicle, allVehicles, limit = 6) => {
  const sourceFeatures = buildVehicleFeatureSet(sourceVehicle);
  const sourceId = sourceVehicle._id.toString();

  return allVehicles
    .filter((vehicle) => vehicle._id.toString() !== sourceId)
    .map((vehicle) => ({
      vehicle,
      similarity: jaccardSimilarity(
        sourceFeatures,
        buildVehicleFeatureSet(vehicle),
      ),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .map(({ vehicle, similarity }) => ({ ...vehicle.toObject(), similarity }));
};

const recommendSimilarVehicles = async (req, res) => {
  try {
    const { id } = req.params;
    const sourceVehicle = await Vehicle.findById(id);

    if (!sourceVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const allVehicles = await Vehicle.find();
    const recommendations = getSimilarVehicles(sourceVehicle, allVehicles);

    res.status(200).json({
      vehicle: sourceVehicle,
      recommendations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  registerVehicle,
  deleteVehicle,
  fetchVehicles,
  fetchVehicleById,
  searchVehicles,
  recommendSimilarVehicles,
  upload,
};
