const adminAuth = (req, res, next) => {
    console.log("Admin Auth Middleware Invoked");
    const token = "xyz";
    const isAdminAuthenticated = token === "xyz";
    if(!isAdminAuthenticated){
        res.status(403).send('Access Denied');
    }else{
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log("user Auth Middleware Invoked");
    const token = "xyz";
    const isUserAuthenticated = token === "xyz";
    if(!isUserAuthenticated){
        res.status(403).send('Access Denied');
    }else{
        next();
    }
}

module.exports = { 
    adminAuth, 
    userAuth,
};