
class Transform_Rotate
{
	constructor(axis, angleInCycles)
	{
		this.axis = axis;
		this.angleInCycles = angleInCycles;
		 
		var orientation = Orientation.fromForwardAndDown
		(
			this.axis.clone().right(), 
			this.axis
		);
		this.transformOrient = new Transform_Orient(orientation);
	}

	transformCoords(coordsToTransform)
	{
		this.transformOrient.transformCoords
		(
			coordsToTransform
		);

		return coordsToTransform;
	}
}
