// async function fetchData(){
//     const res = await fetch("http://localhost:3000/users")
//     const data = await res.json()
//     console.log(data)
// }
// fetchData()
fetch("http://localhost:3000/users")
    .then(r => r.json())
    .then(console.log)

const form = document.querySelector('#form')
const img = document.querySelector("img")

form.addEventListener("submit", (e) =>{
    e.preventDefault()
    const input = form.name
    const file = form.file
    const fd = new FormData()
    fd.append('file', file.files[0])
    fd.append('username', input.value)
    console.log(input)
    console.log(file.files[0])
    fetch("http://localhost:3000/users", {
        method: "POST",
        body: fd
    })
    .then(r => r.json())
    .then((data) =>{
        console.log(data)
        img.src=data.url
    })
    
})



// user =>{
//     console.log(user)
//     fd.append("user_id", user.id)
//     console.log(fd)
//     fetch("http://localhost:3000/avatar", {
//         method: "POST",
//         body: fd
//     })
//     .then(r => r.json())
//     .then(console.log)
// }