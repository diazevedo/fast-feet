import ParcelProblem from '~models/ParcelProblem';

class ProblemController {
  async show(req, res) {
    const { id } = req.params;

    const parcelProblems = await ParcelProblem.findOne({ id });

    return res.json(parcelProblems);
  }
}

export default new ProblemController();
