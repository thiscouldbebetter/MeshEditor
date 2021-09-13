
class NumberHelper
{
	static wrapValueToRangeMax(valueToWrap, max)
	{
		while (valueToWrap < 0)
		{
			valueToWrap += max; // rangeSize == max
		}
	 
		while (valueToWrap >= max)
		{
			valueToWrap -= max;
		}
		 
		return valueToWrap;
	}
}
