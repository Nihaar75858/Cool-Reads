const NavigationConfig = {
    0: [ // Guest / not logged in
        { name: "Home", to: "/", submenus: null },
        { name: "About", to: "/about", submenus: null },
        { name: "Login", to: "/login", submenus: null },
        { name: "Register", to: "/register", submenus: null }
    ],
    1: [
        { name: "Home", to: "/admindashboard", submenus: null },
        {
            name: "Publications", submenus: [
                { name: "View Publications", to: "/admin/viewpublications" },
                { name: "Review Publications", to: "/addpublications" },
                { name: "Modify Publications", to: "/modifybook" },
            ]
        },
        {
            name: "Blogs", submenus: [
                { name: "Create Blog", to: "/createblog" },
                { name: "View Blogs", to: "/viewblogs" },
            ]
        },
        { name: "Notifications", to: "/notifications", submenus: null },
    ],
    2: [
        { name: "Home", to: "/authordashboard", submenus: null },
        { name: "Books", to: "/addbook", submenus: null },
        {
            name: "Blogs", submenus: [
                { name: "Create Blog", to: "/createblog" },
                { name: "View Blogs", to: "/viewblogs" },
            ]
        },
    ],
    3: [
        { name: "Home", to: "/viewerdashboard", submenus: null },
        { name: "Books", to: "/viewbooks", submenus: null },
        { name: "Notifications", to: "/notifications", submenus: null },
        {
            name: "Blogs", submenus: [
                { name: "Create Blog", to: "/createblog" },
                { name: "View Blogs", to: "/viewblogs" },
            ]
        },
    ],
}

export const getNavigationConfig = (userType) => {
    return NavigationConfig[userType] || NavigationConfig[0];
};