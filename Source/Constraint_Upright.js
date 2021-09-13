class Constraint_Upright
{
	constrainLoc(loc)
	{
		var orientation = loc.orientation;
		if (orientation.forward.equals(Coords.Instances().ZeroZeroOne) == false)
		{
			orientation.down.overwriteWithXYZ(0, 0, 1);
		}
	}
}
