const NavigationConfig = {
    0: [ // Guest / not logged in
        { name: "Home", to: "/", submenus: null },
        { name: "About", to: "/about", submenus: null },
        { name: "Blogs", to: "/publicblogs", submenus: null },
        { name: "Books", to: "/pubbooks", submenus: null },
    ],
    1: [ // Admin
        { name: "Home", to: "/admin/admindashboard", submenus: null },
        {
            name: "Publications", submenus: [
                { name: "View Publications", to: "/admin/viewpublications" },
                { name: "Review Publications", to: "/admin/addpublications" },
                { name: "Modify Publications", to: "/admin/modifybook" },
            ]
        },
        {
            name: "Blogs", submenus: [
                { name: "Create Blog", to: "/createblog" },
                { name: "View Blogs", to: "/viewblogs" },
            ]
        },
        { name: "Notifications", to: "/admin/notifications", submenus: null },
    ],
    2: [ //Author
        { name: "Home", to: "/author/authordashboard", submenus: null },
        { name: "Books", to: "/author/addbook", submenus: null },
        {
            name: "Blogs", submenus: [
                { name: "Create Blog", to: "/createblog" },
                { name: "View Blogs", to: "/viewblogs" },
            ]
        },
    ],
    3: [ // Viewer
        { name: "Home", to: "/viewer/viewerdashboard", submenus: null },
        { name: "Books", to: "/viewer/viewbooks", submenus: null },
        { name: "Notifications", to: "/viewer/notifications", submenus: null },
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