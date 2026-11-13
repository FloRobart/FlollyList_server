import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { AppError } from "../../models/AppError.model";



/**
 * Generic middleware validating the parameters of the URL and the query string of the request with Zod.
 * @param schema Zod schema used for the validation.
 * @returns Express middleware, which adds the validated data in req.body.validatedData.params.
 * @throws AppError with status 400 if the validation fails.
 */
export const paramsQueryValidator = (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
    try {
        req.body = { ...req.body, validatedData: { ...req.body?.validatedData, params: schema.parse({ ...req.params, ...req.query }) } };
        next();
    } catch (error) {
        next(new AppError("Invalid request data", 400));
    }
};
