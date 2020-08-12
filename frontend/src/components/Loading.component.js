import React from 'react';
import Lottie from 'react-lottie';

import loaderdata from '../loader/loader1.json';

export default function LoadingP(){
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loaderdata,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    return(
        <div>
            <Lottie 
                options={defaultOptions}
                height={400}
                width={400}
            />
        </div>
    )
}