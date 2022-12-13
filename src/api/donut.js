const API_URI = import.meta.env.VITE_API_URI;
export const postDonut = async (donut) => {
   
     const response = await fetch(`${API_URI}/donut`, {
         method: "POST",
         headers: {
             "Content-Type": "application/json",
           
         },
         body: JSON.stringify(donut),
     });
     return await response.json();
 }