function ArrayExtensions()
{
	// extension class
}
{
	Array.prototype.contains = function(element)
	{
		return (this.indexOf(element) >= 0);
	}
 
	Array.prototype.remove = function(element)
	{
		this.splice(this.indexOf(element), 1);
		return this;
	}
	 
	Array.prototype.removeAt = function(index)
	{
		this.splice(index, 1);
		return this;
	}
}