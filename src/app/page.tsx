'use client';

import { useState } from 'react';
import { Leaf } from 'lucide-react';

export const dynamic = 'force-dynamic';

// Food database with nutritional information
const foodDatabase = {
  breakfast: [
    { name: 'Select an item', calories: 0, protein: 0, carbs: 0, fats: 0, waste: 0 },
    { name: 'Idli (2 pieces)', calories: 150, protein: 2, carbs: 30, fats: 1, waste: 8 },
    { name: 'Dosa', calories: 200, protein: 4, carbs: 35, fats: 5, waste: 10 },
    { name: 'Poha', calories: 180, protein: 3, carbs: 32, fats: 4, waste: 7 },
    { name: 'Bread Toast', calories: 120, protein: 3, carbs: 22, fats: 2, waste: 5 },
    { name: 'Upma', calories: 160, protein: 4, carbs: 28, fats: 3, waste: 8 },
    { name: 'Paratha', calories: 250, protein: 5, carbs: 38, fats: 9, waste: 12 },
  ],
  lunch: [
    { name: 'Select an item', calories: 0, protein: 0, carbs: 0, fats: 0, waste: 0 },
    { name: 'Rice + Dal', calories: 280, protein: 8, carbs: 50, fats: 4, waste: 12 },
    { name: 'Roti + Vegetables', calories: 220, protein: 6, carbs: 40, fats: 5, waste: 10 },
    { name: 'Fried Rice', calories: 320, protein: 7, carbs: 55, fats: 9, waste: 15 },
    { name: 'Biryani', calories: 380, protein: 10, carbs: 58, fats: 12, waste: 18 },
    { name: 'Chapati + Curry', calories: 250, protein: 7, carbs: 45, fats: 6, waste: 11 },
  ],
  dinner: [
    { name: 'Select an item', calories: 0, protein: 0, carbs: 0, fats: 0, waste: 0 },
    { name: 'Roti + Paneer', calories: 280, protein: 12, carbs: 35, fats: 10, waste: 10 },
    { name: 'Sambar Rice', calories: 260, protein: 9, carbs: 48, fats: 5, waste: 12 },
    { name: 'Khichdi', calories: 210, protein: 8, carbs: 38, fats: 4, waste: 8 },
    { name: 'Curd Rice', calories: 180, protein: 6, carbs: 32, fats: 3, waste: 7 },
    { name: 'Pulao', calories: 290, protein: 7, carbs: 50, fats: 7, waste: 14 },
  ],
  snacks: [
    { name: 'Select an item', calories: 0, protein: 0, carbs: 0, fats: 0, waste: 0 },
    { name: 'Pakora', calories: 180, protein: 4, carbs: 20, fats: 10, waste: 15 },
    { name: 'Fruits (Apple)', calories: 80, protein: 1, carbs: 20, fats: 0, waste: 5 },
    { name: 'Nuts (Almonds)', calories: 200, protein: 6, carbs: 8, fats: 18, waste: 2 },
    { name: 'Samosa', calories: 250, protein: 5, carbs: 30, fats: 13, waste: 18 },
    { name: 'Sandwich', calories: 220, protein: 8, carbs: 32, fats: 7, waste: 8 },
    { name: 'Biscuits', calories: 150, protein: 2, carbs: 22, fats: 6, waste: 5 },
  ],
};

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

interface NutritionData {
  meal: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  waste: number;
  status: 'healthy' | 'moderate' | 'high';
}

export default function Index() {
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snacks: 0,
  });

  const [showResults, setShowResults] = useState(false);
  const [nutritionData, setNutritionData] = useState<NutritionData[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleMealChange = (mealType: MealType, index: number) => {
    setSelectedMeals({ ...selectedMeals, [mealType]: index });
  };

  const getMealStatus = (calories: number, waste: number): 'healthy' | 'moderate' | 'high' => {
    if (calories > 300 || waste > 15) return 'high';
    if (calories > 200 || waste > 10) return 'moderate';
    return 'healthy';
  };

  const calculateResults = () => {
    const results: NutritionData[] = [];

    Object.entries(selectedMeals).forEach(([mealType, index]) => {
      const meal = foodDatabase[mealType as MealType][index];
      if (meal.calories > 0) {
        results.push({
          meal: `${mealType.charAt(0).toUpperCase() + mealType.slice(1)}: ${meal.name}`,
          calories: meal.calories,
          protein: meal.protein,
          carbs: meal.carbs,
          fats: meal.fats,
          waste: meal.waste,
          status: getMealStatus(meal.calories, meal.waste),
        });
      }
    });

    setNutritionData(results);
    generateSuggestions(results);
    setShowResults(true);
  };

  const generateSuggestions = (data: NutritionData[]) => {
    const totalCalories = data.reduce((sum, meal) => sum + meal.calories, 0);
    const totalProtein = data.reduce((sum, meal) => sum + meal.protein, 0);
    const totalWaste = data.reduce((sum, meal) => sum + meal.waste, 0);

    const newSuggestions: string[] = [];

    if (totalCalories > 1800) {
      newSuggestions.push('Reduce carb portions by 10% for dinner');
      newSuggestions.push('Consider portion control - your daily intake is high');
    } else if (totalCalories < 1400) {
      newSuggestions.push('Consider adding more nutrient-dense foods');
    }

    if (totalProtein < 60) {
      newSuggestions.push('Add dal, nuts, or dairy to increase protein intake');
      newSuggestions.push('Include paneer or legumes in one meal');
    }

    if (totalWaste > 50) {
      newSuggestions.push('Plan meals to minimize leftover portions');
      newSuggestions.push('Store perishables properly to extend freshness');
      newSuggestions.push('Use vegetable scraps for stocks or composting');
    }

    newSuggestions.push('Prefer seasonal and local ingredients for freshness');
    newSuggestions.push('Measure portions accurately to reduce plate waste');

    setSuggestions(newSuggestions);
  };

  const getTotalNutrition = () => {
    return {
      calories: nutritionData.reduce((sum, meal) => sum + meal.calories, 0),
      protein: nutritionData.reduce((sum, meal) => sum + meal.protein, 0),
      carbs: nutritionData.reduce((sum, meal) => sum + meal.carbs, 0),
      fats: nutritionData.reduce((sum, meal) => sum + meal.fats, 0),
      waste: nutritionData.reduce((sum, meal) => sum + meal.waste, 0),
    };
  };

  const totals = showResults ? getTotalNutrition() : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AI Food & Nutrition</h1>
                <p className="text-xs text-muted-foreground">Waste Reducer</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#" className="text-primary font-medium">Home</a>
              <a href="#" className="text-foreground hover:text-primary">Data & Insights</a>
              <a href="#" className="text-foreground hover:text-primary">Suggestions</a>
              <a href="#" className="text-foreground hover:text-primary">About Us</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-[hsl(120,50%,45%)] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Eat Smart, Waste Less. Your AI<br />Partner for a Sustainable Plate
              </h1>
              <button className="app-button-primary mt-4">
                Get Started
              </button>
            </div>
            <div className="hidden lg:block flex-1">
              <img
                src="/generated/hero-illustration.png"
                alt="Food Illustration"
                className="w-full max-w-md ml-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Meal Input Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Meal Input</h2>

            <div className="space-y-4">
              {/* Breakfast */}
              <div className="app-card">
                <div className="app-card-header">Breakfast</div>
                <div className="app-card-body">
                  <select
                    value={selectedMeals.breakfast}
                    onChange={(e) => handleMealChange('breakfast', Number(e.target.value))}
                  >
                    {foodDatabase.breakfast.map((item, index) => (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Lunch */}
              <div className="app-card">
                <div className="app-card-header">Lunch</div>
                <div className="app-card-body">
                  <select
                    value={selectedMeals.lunch}
                    onChange={(e) => handleMealChange('lunch', Number(e.target.value))}
                  >
                    {foodDatabase.lunch.map((item, index) => (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dinner */}
              <div className="app-card">
                <div className="app-card-header">Dinner</div>
                <div className="app-card-body">
                  <select
                    value={selectedMeals.dinner}
                    onChange={(e) => handleMealChange('dinner', Number(e.target.value))}
                  >
                    {foodDatabase.dinner.map((item, index) => (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Snacks */}
              <div className="app-card">
                <div className="app-card-header">Snacks</div>
                <div className="app-card-body">
                  <select
                    value={selectedMeals.snacks}
                    onChange={(e) => handleMealChange('snacks', Number(e.target.value))}
                  >
                    {foodDatabase.snacks.map((item, index) => (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={calculateResults}
                className="app-button-primary w-full"
              >
                Calculate
              </button>
            </div>
          </div>

          {/* Data & Insights Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Data & Insights</h2>

            {showResults && totals ? (
              <div className="space-y-6">
                {/* Nutrition Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="app-card">
                    <div className="app-card-body text-center">
                      <div className="text-3xl font-bold text-primary">{totals.calories}</div>
                      <div className="text-sm text-muted-foreground">Total Calories</div>
                    </div>
                  </div>
                  <div className="app-card">
                    <div className="app-card-body text-center">
                      <div className="text-3xl font-bold text-destructive">{totals.waste}g</div>
                      <div className="text-sm text-muted-foreground">Food Waste</div>
                    </div>
                  </div>
                </div>

                {/* Nutrition Table */}
                <div className="app-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-3 font-semibold">Meal</th>
                          <th className="text-center p-3 font-semibold">Cal</th>
                          <th className="text-center p-3 font-semibold">Protein</th>
                          <th className="text-center p-3 font-semibold">Carbs</th>
                          <th className="text-center p-3 font-semibold">Fats</th>
                          <th className="text-center p-3 font-semibold">Waste</th>
                        </tr>
                      </thead>
                      <tbody>
                        {nutritionData.map((meal, index) => (
                          <tr
                            key={index}
                            className={`border-t border-border ${
                              meal.status === 'high' ? 'bg-red-50' :
                              meal.status === 'moderate' ? 'bg-yellow-50' :
                              'bg-green-50'
                            }`}
                          >
                            <td className="p-3">{meal.meal}</td>
                            <td className="text-center p-3">{meal.calories}</td>
                            <td className="text-center p-3">{meal.protein}g</td>
                            <td className="text-center p-3">{meal.carbs}g</td>
                            <td className="text-center p-3">{meal.fats}g</td>
                            <td className="text-center p-3">{meal.waste}g</td>
                          </tr>
                        ))}
                        <tr className="border-t-2 border-primary font-bold">
                          <td className="p-3">Total</td>
                          <td className="text-center p-3">{totals.calories}</td>
                          <td className="text-center p-3">{totals.protein}g</td>
                          <td className="text-center p-3">{totals.carbs}g</td>
                          <td className="text-center p-3">{totals.fats}g</td>
                          <td className="text-center p-3">{totals.waste}g</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Visual Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nutrition Distribution */}
                  <div className="app-card">
                    <div className="app-card-header">Nutrient Distribution</div>
                    <div className="app-card-body">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Protein</span>
                            <span className="text-sm font-semibold">{totals.protein}g</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div
                              className="bg-primary h-3 rounded-full transition-all"
                              style={{ width: `${(totals.protein / (totals.protein + totals.carbs + totals.fats)) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Carbs</span>
                            <span className="text-sm font-semibold">{totals.carbs}g</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div
                              className="bg-warning h-3 rounded-full transition-all"
                              style={{ width: `${(totals.carbs / (totals.protein + totals.carbs + totals.fats)) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Fats</span>
                            <span className="text-sm font-semibold">{totals.fats}g</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div
                              className="bg-destructive h-3 rounded-full transition-all"
                              style={{ width: `${(totals.fats / (totals.protein + totals.carbs + totals.fats)) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Waste by Meal */}
                  <div className="app-card">
                    <div className="app-card-header">Weekly Food Waste Levels</div>
                    <div className="app-card-body">
                      <div className="space-y-3">
                        {nutritionData.map((meal, index) => (
                          <div key={index}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">{meal.meal.split(':')[0]}</span>
                              <span className="text-sm font-semibold">{meal.waste}g</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-3">
                              <div
                                className={`h-3 rounded-full transition-all ${
                                  meal.status === 'high' ? 'bg-destructive' :
                                  meal.status === 'moderate' ? 'bg-warning' :
                                  'bg-success'
                                }`}
                                style={{ width: `${(meal.waste / totals.waste) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="app-card">
                  <div className="app-card-header">AI-Generated Suggestions</div>
                  <div className="app-card-body">
                    <ul className="space-y-2">
                      {suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-success mt-1">✓</span>
                          <span className="text-sm">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="app-card">
                <div className="app-card-body text-center py-12">
                  <p className="text-muted-foreground">
                    Select your meals and click Calculate to see nutrition analysis and AI suggestions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
            <div>
              <p className="font-semibold mb-1">Contact Us</p>
              <p className="text-muted-foreground">contact@aifood.com</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Quick Links</p>
              <p className="text-muted-foreground">science@school.com</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Privacy Policy</p>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-white text-xs">
                f
              </div>
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-white text-xs">
                t
              </div>
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-white text-xs">
                in
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
