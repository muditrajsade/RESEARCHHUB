import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate , createSearchParams } from 'react-router-dom';
import PaperDetail from "./ppr";
export default function HorizontalScrollCards({ id , k }) {
  const [data, setData] = useState(null);



  useEffect(() => {
    // Simulate API call delay

    async function t(){
        let rfd = await fetch('https://researchit.xyz/similar',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "arxiv_id": id,
          "top_k": 10,
          "fetch_metadata": true,
          "return_vector": false,
          "save_embeddings_only": false
        }
      )
    });
    let data = await rfd.json();
    let rfs = data.results;
    let plm = [];
      for(let j = 0;j<rfs.length;j++){
        let rft = rfs[j];
        let rf = rft.metadata;
        if( rf != null){
          let title = rf.title;
          let abstract = rf.abstract;
          let pl = {title:title,abstract:abstract,id:rft.arxiv_id,authors:rf.authors,categories:rf.categories,score:rft.score,published:rf.published};
          plm.push(pl);
        }
      }

    setData([...plm])
    }

    t();


    
    

  }, []);

  const loadingSkeletons = Array(5).fill(null);

  


  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-4 min-w-max">
        {data
          ? data.map((item, index) => (
              <Card
                key={`${id}-${index}`}
                className="min-w-[250px] flex-shrink-0 shadow-md"
                onClick={()=> { 
                
                        k(item);
                
                    // ✅ Pass string with ?
                    }}
                
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                 
                </CardContent>
              </Card>
            ))
          : loadingSkeletons.map((_, index) => (
              <Card
                key={`skeleton-${index}`}
                className="min-w-[250px] flex-shrink-0 shadow-md"
              >
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" /> {/* Title placeholder */}
                  <Skeleton className="h-4 w-full" /> {/* First line */}
                  <Skeleton className="h-4 w-5/6" /> {/* Second line */}
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
