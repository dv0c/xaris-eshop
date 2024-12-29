import prisma from "@/app/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export async function Hero() {
  const data = await getData();

  return (
    <Carousel>
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative select-none h-[60vh] lg:h-[80vh]">
              <Image
              draggable={false}
                alt="Banner Image"
                src={item.imageString}
                fill
                className="object-cover w-full h-full rounded-xl"
              />
              <div className="absolute top-0 left-0 bg-opacity-75 bg-black text-white px-4 py-2 rounded-br-xl shadow-lg transition-transform cursor-default">
                <h1 className="text-md font-semibold">{item.title}</h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
}
