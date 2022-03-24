class Bounds
{
	constructor(min, max)
	{
		this.min = min;
		this.max = max;
		this.size = new Coords();
		this.sizeRecalculate();
	}

	// static methods

	static ofPoints(pointsToFindBoundsOf)
	{
		var point0 = pointsToFindBoundsOf[0];
		var min = point0.clone();
		var max = point0.clone();
		 
		for (var i = 1; i < pointsToFindBoundsOf.length; i++)
		{
			var point = pointsToFindBoundsOf[i];
			if (point.x < min.x)
			{
				min.x = point.x;
			}
			else if (point.x > max.x)
			{
				max.x = point.x;
			}
 
			if (point.y < min.y)
			{
				min.y = point.y;
			}
			else if (point.y > max.y)
			{
				max.y = point.y;
			}
 
			if (point.z < min.z)
			{
				min.z = point.z;
			}
			else if (point.z > max.z)
			{
				max.z = point.z;
			}
		}
		 
		var returnValue = new Bounds(min, max);
		 
		return returnValue;
	}

	// instance methods

	center()
	{
		return this.min.clone().add(this.max).half();
	}

	sizeRecalculate()
	{
		this.size.overwriteWith(this.max).subtract(this.min);
	}

	trimCoords(coordsToTrim)
	{
		if (coordsToTrim.x < this.min.x)
		{
			coordsToTrim.x = this.min.x;
		}
		else if (coordsToTrim.x > this.max.x)
		{
			coordsToTrim.x = this.max.x;
		}

		if (coordsToTrim.y < this.min.y)
		{
			coordsToTrim.y = this.min.y;
		}
		else if (coordsToTrim.y > this.max.y)
		{
			coordsToTrim.y = this.max.y;
		}

		if (coordsToTrim.z < this.min.z)
		{
			coordsToTrim.z = this.min.z;
		}
		else if (coordsToTrim.z > this.max.z)
		{
			coordsToTrim.z = this.max.z;
		}

		return coordsToTrim;
	}
}
