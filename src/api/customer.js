const API_URI = import.meta.env.VITE_API_URI;
export const postCustomer = async (customer) => {
   
    const response = await fetch(`${API_URI}/customer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          
        },
        body: JSON.stringify(customer),
    });
    return await response.json();
}