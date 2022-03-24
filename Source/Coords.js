
class Coords
{
	constructor(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}

	// instances
	 
	static Instances()
	{
		if (Coords._instances == null)
		{
			Coords._instances = new Coords_Instances();
		}
		return Coords._instances;
	}
 
	// methods

	add(other)
	{
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;
		return this;
	}

	clear()
	{
		this.x = 0;
		this.y = 0;
		this.z = 0;
		return this;
	}

	clone()
	{
		return new Coords(this.x, this.y, this.z);
	}

	crossProduct(other)
	{
		return this.overwriteWithXYZ 
		(
			this.y * other.z - this.z * other.y,
			this.z * other.x - this.x * other.z,
			this.x * other.y - this.y * other.x
		);
	}

	divide(other)
	{
		this.x /= other.x;
		this.y /= other.y;
		this.z /= other.z;
		return this;
	}

	divideScalar(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;
		this.z /= scalar;
		return this;
	}

	dotProduct(other)
	{
		return this.x * other.x + this.y * other.y + this.z * other.z;
	}

	equals(other)
	{
		var returnValue = 
		(
			this.x == other.x
			&& this.y == other.y
			&& this.z == other.z
		);
		 
		return returnValue;
	}

	half()
	{
		return this.divideScalar(2);
	}

	invert()
	{
		return this.multiplyScalar(-1);
	}

	magnitude()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	multiply(other)
	{
		this.x *= other.x;
		this.y *= other.y;
		this.z *= other.z;
		return this;
	}

	multiplyScalar(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		return this;
	}

	normalize()
	{
		return this.divideScalar(this.magnitude());
	}

	overwriteWith(other)
	{
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;
		return this;
	}

	overwriteWithXYZ(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}

	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		this.z -= other.z;
		return this;
	}
}

class Coords_Instances
{
	constructor()
	{
		this.Ones = new Coords(1, 1, 1);
		this.ZeroZeroOne = new Coords(0, 0, 1); 
		this.Zeroes = new Coords(0, 0, 0);
	}
}
