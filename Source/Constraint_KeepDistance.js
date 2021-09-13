
class Constraint_KeepDistance
{
	constructor(targetPos, distanceToMaintain)
	{
		this.targetPos = targetPos;
		this.distanceToMaintain = distanceToMaintain;
	}

	constrainLoc(loc)
	{
		var displacement = loc.pos.subtract // No clone needed.
		(
			this.targetPos
		);

		displacement.normalize().multiplyScalar
		(
			this.distanceToMaintain
		).add
		(
			this.targetPos
		);
	}
}
