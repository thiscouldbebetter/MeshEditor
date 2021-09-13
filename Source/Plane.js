
class Plane
{
	constructor(normal, distanceFromOrigin)
	{
		this.normal = normal;
		this.distanceFromOrigin = distanceFromOrigin;
	}

	// helper variables
	static displacementFromPoint0To1 = new Coords();
	static displacementFromPoint1To2 = new Coords();

	// static methods

	static fromPoints(points)
	{
		var displacementFromPoint0To1 = Plane.displacementFromPoint0To1;
		var displacementFromPoint1To2 = Plane.displacementFromPoint1To2;
		 
		var point0 = points[0];
		var point1 = points[1];
		var point2 = points[2];
		 
		displacementFromPoint0To1.overwriteWith(point1).subtract(point0);
		displacementFromPoint1To2.overwriteWith(point2).subtract(point1);
		 
		var normal = new Coords().overwriteWith
		(
			displacementFromPoint0To1
		).crossProduct
		(
			displacementFromPoint1To2
		).normalize();
		 
		var distanceFromOrigin = normal.dotProduct(point0);
		 
		var returnValue = new Plane(normal, distanceFromOrigin);
		 
		return returnValue;
	}
}
