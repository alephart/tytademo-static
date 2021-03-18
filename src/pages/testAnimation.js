import React, {useEffect,useState} from 'react';



    
const TestAnim = () => {
     
    const [isLoading, setIsLoading] = useState(true);

    const cacheImages = async (arr) => {
        const images = await arr.map((src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
                img.src = src;
                img.onload = resolve();
                img.onerror = reject();
            });
        });
        
        await Promise.all(images);
        
        setIsLoading(false);
    };

    const [count, setCount] = useState(1)

    const requestRef = React.useRef();
    const previousTimeRef = React.useRef();
    const animate = time => {
      if (previousTimeRef.current != undefined) {
        const deltaTime = time - previousTimeRef.current;
        // Pass on a function to the setter of the state
        // to make sure we always have the latest state
        setCount(prevCount => ( prevCount + deltaTime * 0.01) % 175 );
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    }
    useEffect(() => {
        const imgs= [
            'sec/image-0001.png',
            'sec/image-0002.png',
            'sec/image-0003.png',
            'sec/image-0004.png',
            'sec/image-0005.png',
            'sec/image-0006.png',
            'sec/image-0007.png',
            'sec/image-0008.png',
            'sec/image-0009.png',
            'sec/image-00010.png',
            'sec/image-00011.png',    
            'sec/image-00012.png',
            'sec/image-00013.png',
            'sec/image-00014.png',
            'sec/image-00015.png',
            'sec/image-00016.png',    
            'sec/image-00017.png',
            'sec/image-00018.png',
            'sec/image-00019.png',   
            'sec/image-00020.png',
            'sec/image-00021.png',
            'sec/image-00022.png',    
            'sec/image-00023.png',
            'sec/image-00024.png',
            'sec/image-00025.png',
            'sec/image-00026.png',
            'sec/image-00027.png',    
            'sec/image-00028.png',
            'sec/image-00029.png',
            'sec/image-00030.png',
            'sec/image-00031.png',
            'sec/image-00032.png',
            'sec/image-00033.png',
            'sec/image-00034.png',
            'sec/image-00035.png',
            'sec/image-00036.png',    
            'sec/image-00037.png',
            'sec/image-00038.png',
            'sec/image-00039.png',
            'sec/image-00040.png',
            'sec/image-00041.png',
            'sec/image-00042.png',
            'sec/image-00043.png',
            'sec/image-00044.png',
            'sec/image-00045.png',
            'sec/image-00046.png',    
            'sec/image-00047.png',
            'sec/image-00048.png',
            'sec/image-00049.png',
            'sec/image-00050.png',
            'sec/image-00051.png',
            'sec/image-00052.png',
            'sec/image-00053.png',
            'sec/image-00054.png',
            'sec/image-00055.png',
            'sec/image-00056.png',    
            'sec/image-00057.png',
            'sec/image-00058.png',
            'sec/image-00059.png',
            'sec/image-00060.png',
            'sec/image-00061.png',
            'sec/image-00062.png',
            'sec/image-00063.png',
            'sec/image-00064.png',
            'sec/image-00065.png',
            'sec/image-00066.png',    
            'sec/image-00067.png',
            'sec/image-00068.png',
            'sec/image-00069.png',
            'sec/image-00070.png',
            'sec/image-00071.png',
            'sec/image-00072.png',
            'sec/image-00073.png',
            'sec/image-00074.png',
            'sec/image-00075.png',
            'sec/image-00076.png',    
            'sec/image-00077.png',
            'sec/image-00078.png',
            'sec/image-00079.png',
            'sec/image-00080.png',
            'sec/image-00081.png',
            'sec/image-00082.png',
            'sec/image-00083.png',
            'sec/image-00084.png',
            'sec/image-00085.png',
            'sec/image-00086.png',
            'sec/image-00087.png',
            'sec/image-00088.png',
            'sec/image-00089.png',
            'sec/image-00090.png',
            'sec/image-00091.png',
            'sec/image-00092.png',
            'sec/image-00093.png',
            'sec/image-00094.png',
            'sec/image-00095.png',
            'sec/image-00096.png',    
            'sec/image-00097.png',
            'sec/image-00098.png',
            'sec/image-00099.png',
            'sec/image-000100.png',
            'sec/image-000101.png',    
            'sec/image-000102.png',
            'sec/image-000103.png',
            'sec/image-000104.png',
            'sec/image-000105.png',
            'sec/image-000106.png',    
            'sec/image-000107.png',
            'sec/image-000108.png',
            'sec/image-000109.png',
            'sec/image-000110.png',
            'sec/image-000111.png',    
            'sec/image-000112.png',
            'sec/image-000113.png',
            'sec/image-000114.png',
            'sec/image-000115.png',
            'sec/image-000116.png',    
            'sec/image-000117.png',
            'sec/image-000118.png',
            'sec/image-000119.png',
            'sec/image-000120.png',
            'sec/image-000121.png',
            'sec/image-000122.png',    
            'sec/image-000123.png',
            'sec/image-000124.png',
            'sec/image-000125.png',
            'sec/image-000126.png',
            'sec/image-000127.png',    
            'sec/image-000128.png',
            'sec/image-000129.png',
            'sec/image-000130.png',
            'sec/image-000131.png',
            'sec/image-000132.png',
            'sec/image-000133.png',
            'sec/image-000134.png',
            'sec/image-000135.png',
            'sec/image-000136.png',    
            'sec/image-000137.png',
            'sec/image-000138.png',
            'sec/image-000139.png',
            'sec/image-000140.png',
            'sec/image-000141.png',
            'sec/image-000142.png',
            'sec/image-000143.png',
            'sec/image-000144.png',
            'sec/image-000145.png',
            'sec/image-000146.png',    
            'sec/image-000147.png',
            'sec/image-000148.png',
            'sec/image-000149.png',
            'sec/image-000150.png',
            'sec/image-000151.png',
            'sec/image-000152.png',
            'sec/image-000153.png',
            'sec/image-000154.png',
            'sec/image-000155.png',
            'sec/image-000156.png',    
            'sec/image-000157.png',
            'sec/image-000158.png',
            'sec/image-000159.png',
            'sec/image-000160.png',
            'sec/image-000161.png',
            'sec/image-000162.png',
            'sec/image-000163.png',
            'sec/image-000164.png',
            'sec/image-000165.png',
            'sec/image-000166.png',    
            'sec/image-000167.png',
            'sec/image-000168.png',
            'sec/image-000169.png',
            'sec/image-000170.png',
            'sec/image-000171.png',
            'sec/image-000172.png',
            'sec/image-000173.png',
            'sec/image-000174.png',
            'sec/image-000175.png',
        ];
        cacheImages(imgs);
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);


    return (
        <div className="wrapperTest">
            {!isLoading && (
                <img src={`../sec/image-000${Math.round(count)}.png`} alt=""/>
            )}
        </div>
    );
    
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    // Make sure the effect runs only once
    //return <div className="wrapperTest"><img src={`../sec/image-000${Math.round(count)}.png`}/></div>

}

   
export default TestAnim