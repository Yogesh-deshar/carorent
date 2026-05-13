import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const Cardetail = () => {
  return (
    <>
      <section className="flex gap-2 md:mx-30 mt-5">
        <main className="md:w-1/2 w-full">
          <h2 className="text-[64px]">Car Name </h2>
          <div className="flex justify-between text-[36px] mt-[-25px] md:w-[565px]">
            <p>Model</p>
            <p>$100/day</p>
          </div>

          <Card className="w-[565px] mt-4">
            <CardHeader>
              <h2 className="text-[32px] text-center">Specs</h2>
            </CardHeader>

            <CardContent>
              <Accordion
                type="single"
                collapsible
                className="border border-black px-3 py-2 "
              >
                <AccordionItem value="engine ">
                  <AccordionTrigger className="text-[16px] font-bold items-center">
                    Engine
                  </AccordionTrigger>

                  <AccordionContent>
                    <dl>
                      <div className="flex justify-between py-2.5 text-sm border-b border-border">
                        <dt className="text-muted-foreground">Engine Type</dt>
                        <dd className="font-medium text-foreground">V6</dd>
                      </div>
                    </dl>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </main>

        <aside className=" md:w-1/2 ">
          <Image
            src="/test1.jpg"
            alt="Car Image"
            width={600}
            height={500}
            className="h-[500px]"
          />
        </aside>
      </section>
    </>
  );
};

export default Cardetail;
