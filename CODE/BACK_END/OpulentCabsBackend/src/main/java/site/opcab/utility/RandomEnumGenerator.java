package site.opcab.utility;

import java.util.Random;

public class RandomEnumGenerator<T extends Enum<?>> {

	private final Random random = new Random();
	private final double[] probabilities;
	private final T[] values;

	public RandomEnumGenerator(Class<T> enumClass, double[] probabilities) {
		if (enumClass == null || probabilities == null || enumClass.getEnumConstants().length != probabilities.length) {
			throw new IllegalArgumentException("Invalid arguments");
		}
		this.values = enumClass.getEnumConstants();
		this.probabilities = probabilities;
	}

	public T getRandom() {
		double randomValue = random.nextDouble();
		double cumulativeProbability = 0.0;
		for (int i = 0; i < probabilities.length; i++) {
			cumulativeProbability += probabilities[i];
			if (randomValue <= cumulativeProbability) {
				return values[i];
			}
		}
		// This shouldn't happen, but just in case
		return values[random.nextInt(values.length)];
	}
}
