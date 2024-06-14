const companyService = require("../services/companyService");
const companyTransactions = require("../services/transactions/companyTransactions");
const authUtils = require("../utils/authUtils");

exports.addOneCompanyWithAdmin = async function (req, res, next) {
    try {
        // company details
        const companyData = {
            name: req.body.name,
            email: req.body.email,
            industry: req.body.industry,
            size: req.body.size,
        };

        // admin details
        const adminData = {
            firstName: req.body.adminFirstName,
            lastName: req.body.adminLastName,
            email: req.body.adminEmail,
            password: req.body.adminPassword,
            role: "CompanyAdmin",
            isVerified: false,
        };

        const company = await companyTransactions.createCompanyWithAdmin(
            companyData,
            adminData
        );
        return res.status(201).json({
            message: "Company admin registered successfully",
            data: company,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

exports.getOneCompanyById = async function (req, res, next) {
    try {
        const company = await companyService.getOneCompanyByID(req.params.id);

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        return res.status(201).json({ data: company });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

exports.verifyOneCompanyById = async function (req, res, next) {
    try {
        const company = await companyService.verifyOneCompanyById(
            req.params.id
        );
        return res.status(201).json({
            message: "Company status verified successfully",
            data: company,
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

exports.getAllCompanies = async function (req, res, next) {
    try {
        const companies = await companyService.getAllCompanies({});
        return res.status(201).json({ data: companies });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

exports.updateOneCompany = async function (req, res, next) {
    try {
        const company = await companyService.updateOneCompany(
            req.params.id,
            req.body
        );

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        return res.status(201).json({ data: company });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};
