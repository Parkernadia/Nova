const mongoose = require("mongoose");
const companyService = require("../companyService");
const userService = require("../userService");

exports.createCompanyWithAdmin = async function (companyData, adminData) {
    const session = await mongoose.startSession();
    try {
        const company = await session.withTransaction(async () => {
            const company = await companyService.addOneCompany(companyData, {
                session,
            });
            const admin = await userService.addOneUser(
                { ...adminData, companyId: company._id },
                { session }
            );
            await session.commitTransaction();
            return company;
        });
        return company;
    } catch (error) {
        throw error;
    } finally {
        (await session).endSession();
    }
};
