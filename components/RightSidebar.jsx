import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const RightSidebar = ({ data }) => {
  return (
    <div className="md:mx-auto rounded shadow-xl w-full  overflow-hidden ">
      <div className="lg:px-5 lg:py-2 flex flex-col gap-3 lg:pb-6 lg:m-6">
        <div className="flex flex-col gap-3">
          {data?.companies ? (
            <div className="grid lg:grid-cols-3 gap-4 mt-2">
              {data?.companies.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>
                      <span className="text-orange-400">Name: {item.name}</span>
                    </CardTitle>
                    <CardDescription>Website: {item.website}</CardDescription>
                    <p className="text-[12px] text-white">
                      <span className="text-green-200">Match Reason: </span>
                      {item.match_reason}
                    </p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="grid lg:grid-cols-3 gap-4 mt-2">
                <Skeleton className="w-full h-[50px] rounded-2xl" />
                <Skeleton className="w-full h-[50px] rounded-2xl" />
                <Skeleton className="w-full h-[50px] rounded-2xl" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
