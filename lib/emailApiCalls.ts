
export const getEmails = async() => {
    const res = await fetch('/api/emails')
    const data = await res.json()
    console.log(data.emails);
    
    
}