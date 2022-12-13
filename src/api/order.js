const API_URI = import.meta.env.VITE_API_URI;
export const postOrder = async (order) => {
   
    const response = await fetch(`${API_URI}/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          
        },
        body: JSON.stringify(order),
    });
    return await response.json();
}