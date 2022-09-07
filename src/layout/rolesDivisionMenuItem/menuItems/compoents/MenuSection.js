const MenuSection = (label, key, icon, menu) => {
    return {
        label,
        key,
        icon,
        children: menu,
    }
}

export default MenuSection
