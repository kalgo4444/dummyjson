document.addEventListener("DOMContentLoaded", () => {

    const API = `https://dummyjson.com`
    const limitLoad = 8

    async function getData(endpoint, callback) {
        try {
            const res = await fetch(`${API}${endpoint}`)
            const data = await res.json()
            callback(data)
            loader.style.display = "none"
        } catch (err) {
            console.error()
        }
    }

    window.onload = () => {
        getData(`/users?limit=${limitLoad}`, cardRender)
    }

    const wrapperELL = document.querySelector(".wrapper")
    const moreBtnEL = document.querySelector(".more-btn")

    function cardRender(data) {
        wrapperELL.innerHTML = ""
        const fr = document.createDocumentFragment()
        data.users.forEach(item => {
            const article = document.createElement("article")
            article.classList.add("card")
            article.innerHTML = `
				<div>
					<img class="cardImg" src="/assets/img/person.png" loading="lazy" alt="Card img" />
				</div>
				<div>
					<h3>${item.firstName} ${item.lastName}</h3>
					<b>Company: ${item.company.name}</b>
					<p>Department: ${item.company.department}</p>
					<strong>Role: ${item.role}</strong>
				</div>
            `
            fr.appendChild(article)
        })
        wrapperELL.appendChild(fr)
    }

    let count = 1
    moreBtnEL.onclick = () => {
        count++
        getData(`/users?limit=${limitLoad * count}`, cardRender)
    }
})