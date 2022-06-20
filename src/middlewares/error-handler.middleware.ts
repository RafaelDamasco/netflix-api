import { Response } from "express"

const errorHandler = (e: any, response: Response) => {
    response
      .status(e.status)
      .json({
        error: true,
        message: e.message
      })
}

export default errorHandler
