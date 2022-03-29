import bcrypt from 'bcrypt';

const encryptPassword =  (req, res, next) => {
    try {
        const saltRounds = 10;
        console.log(`---> encryptPassword ${req.body.password}`);
        const passwordHash = bcrypt.hashSync(req.body.password, saltRounds);
        req.body.password = passwordHash;
        console.log(`---> encryptPassword ${req.body.password}`);
        next();
    } catch (error) {
        next(error);
    }
}


const encryptPasswordTest = ()=>{ console.log("Test encryptPasswordTest")}


export default { 
    encryptPassword,
    encryptPasswordTest
};