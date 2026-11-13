import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { AppError } from "../../models/AppError.model";



/**
 * Generic middleware validating the body of the request with Zod.
 * The body is never logged: it holds the data of the user.
 * @param schema Zod schema used for the validation.
 * @returns Express middleware, which adds the validated data in req.body.validatedData.body.
 * @throws AppError with status 400 if the validation fails.
 */
export const bodyValidator = (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
    try {
        req.body = { ...req.body, validatedData: { ...req.body?.validatedData, body: schema.parse(req.body) } };
        next();
    } catch (error) {
        next(new AppError("Invalid request data", 400));
    }
};
