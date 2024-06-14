const express = require("express");
const {
    validateResource,
    validateWithParams,
    validateWithQuery,
} = require("../middlewares/validateResource");
const companyController = require("../controllers/companyController");
const {
    createCompanySchema,
    updateCompanySchema,
    createCompanyWithAdminSchema,
} = require("../schemas/companySchema");

const router = express.Router();

router
    .route("/companies")
    .post(
        validateResource(createCompanyWithAdminSchema),
        companyController.addOneCompanyWithAdmin
    )
    .get(companyController.getAllCompanies);

router
    .route("/companies/:id")
    .get(companyController.getOneCompanyById)
    .patch(
        validateWithParams(updateCompanySchema),
        companyController.updateOneCompany
    );

router
    .route("/companies/:id/verify")
    .patch(companyController.verifyOneCompanyById);

module.exports = router;
