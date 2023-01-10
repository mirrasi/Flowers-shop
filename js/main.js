// Hover nav-item
let hoverNavItem = () => {
    let navItems = document.getElementsByClassName("nav-item")
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener("mouseover", () => navItems[i].style.backgroundColor = "#e1603a")
        navItems[i].addEventListener("mouseout", () => navItems[i].style.backgroundColor = "transparent")

    }

}

hoverNavItem()