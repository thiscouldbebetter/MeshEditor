
class Constraint_LookAt
{
	constructor(targetPos)
	{
		this.targetPos = targetPos;
	}

	constrainLoc(loc)
	{
		var orientation = loc.orientation;
		orientation.forward.overwriteWith
		(
			this.targetPos
		).subtract
		(
			loc.pos
		)

		orientation.orthogonalizeAxes().normalizeAxes();
	}
}
