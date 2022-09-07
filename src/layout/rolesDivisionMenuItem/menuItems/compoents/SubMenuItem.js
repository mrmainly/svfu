const SubMenuItem = (icon, label, key, route, navigate) => {
    return {
        icon: <div>{icon}</div>,
        label: label,
        key: key,
        onClick: () => {
            navigate(route)
        },
    }
}

export default SubMenuItem
