class Camera
{
	constructor(viewSize, focalLength, loc)
	{
		this.viewSize = viewSize;
		this.focalLength = focalLength;
		this.loc = loc;

		this.viewSizeHalf = this.viewSize.clone().divideScalar(2);

		this.constraints = 
		[
			new Constraint_Upright(),   
			new Constraint_LookAt(new Coords(0, 0, 0)),
			new Constraint_KeepDistance(new Coords(0, 0, 0), this.loc.pos.magnitude()),
		];

		this.reinitialize();
	}

	constraintsApply()
	{
		for (var i = 0; i < this.constraints.length; i++)
		{
			var constraint = this.constraints[i];
			constraint.constrainLoc(this.loc)
		}
	}

	transformCoordsWorldToView(coordsToTransform)
	{
		return this.transformWorldToView.transformCoords(coordsToTransform);
	}

	transformCoordsViewToWorld(coordsToTransform)
	{
		return this.transformViewToWorld.transformCoords(coordsToTransform);
	}

	transformDistanceWorldToView(distanceToTransform, distanceFromCamera)
	{
		var returnValue = distanceToTransform * this.focalLength * this.focalLength / distanceFromCamera;
		return returnValue;
	}

	// serialization

	reinitialize()
	{
		// hack

		this.loc.orientation.axesReset();

		this.transformWorldToView = new Transform_Multiple
		([
			new Transform_TranslateInverse(this.loc.pos),
			new Transform_Orient(this.loc.orientation),
			new Transform_Perspective(this.focalLength),
			new Transform_Translate(this.viewSizeHalf),
		]);

		this.transformViewToWorld = new Transform_Multiple
		([
			new Transform_TranslateInverse(this.viewSizeHalf),  
			new Transform_PerspectiveInverse(this.focalLength),
			new Transform_OrientInverse(this.loc.orientation),
			new Transform_Translate(this.loc.pos),
		]);
	}
}
