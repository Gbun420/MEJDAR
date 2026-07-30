<?php

declare(strict_types=1);

namespace Mejdar\Core\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SeedDemoCommand extends Command
{
    protected $signature = 'mejdar:seed-demo
        {--fresh : Remove existing demo data before seeding}';

    protected $description = 'Seed the Harbour Table demo restaurant with sample data';

    public function handle(): int
    {
        $this->info('MEJDAR Demo Seeder');
        $this->info('=================');
        $this->newLine();

        try {
            DB::beginTransaction();

            $this->seedLocation();
            $this->seedCategories();
            $this->seedMenuOptions();
            $this->seedMenuItems();
            $this->seedWorkingHours();
            $this->seedCustomers();
            $this->seedOrders();
            $this->seedReservations();
            $this->seedCoupons();

            DB::commit();

            $this->newLine();
            $this->info('Demo seeding complete!');
            $this->newLine();
            $this->info('Next steps:');
            $this->line('  1. Log in to admin at /admin');
            $this->line('  2. Configure the restaurant settings');
            $this->line('  3. Test the customer-facing storefront');

            return Command::SUCCESS;
        } catch (\Exception $e) {
            DB::rollBack();
            $this->error('Seeding failed: ' . $e->getMessage());
            $this->error('All changes have been rolled back.');

            return Command::FAILURE;
        }
    }

    protected function seedLocation(): void
    {
        $this->info('Step 1: Creating Harbour Table location...');

        $exists = DB::table('locations')
            ->where('location_name', 'Harbour Table')
            ->exists();

        if ($exists) {
            $this->line('  Location "Harbour Table" already exists, skipping.');
            return;
        }

        $locationId = DB::table('locations')->insertGetId([
            'location_name' => 'Harbour Table',
            'location_email' => 'info@harbourtable.mt',
            'description' => 'Harbour Table is a Mediterranean restaurant located in the heart of Valletta harbour, offering fresh seafood and traditional Maltese cuisine with a modern twist.',
            'location_address_1' => '12 Grand Harbour View',
            'location_address_2' => 'The Strand',
            'location_city' => 'Valletta',
            'location_state' => 'Valletta',
            'location_postcode' => 'VLT 1920',
            'location_country_id' => $this->getCountryId('Malta'),
            'location_telephone' => '+356 2123 4567',
            'location_lat' => 35.8989,
            'location_lng' => 14.5146,
            'location_radius' => 5,
            'location_status' => 1,
            'permalink_slug' => 'harbour-table',
            'is_default' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->seedLocationTables($locationId);

        $this->info("  ✓ Created Harbour Table location (ID: {$locationId})");
    }

    protected function seedLocationTables(int $locationId): void
    {
        if (DB::table('tables')->count()) {
            $this->line('  Tables already exist, skipping.');
            return;
        }

        $tables = [
            ['table_name' => 'Window Seat 1', 'min_capacity' => 2, 'max_capacity' => 2],
            ['table_name' => 'Window Seat 2', 'min_capacity' => 2, 'max_capacity' => 2],
            ['table_name' => 'Window Seat 3', 'min_capacity' => 2, 'max_capacity' => 4],
            ['table_name' => 'Harbour Table 1', 'min_capacity' => 2, 'max_capacity' => 6],
            ['table_name' => 'Harbour Table 2', 'min_capacity' => 2, 'max_capacity' => 6],
            ['table_name' => 'Harbour Table 3', 'min_capacity' => 4, 'max_capacity' => 8],
            ['table_name' => 'Private Dining 1', 'min_capacity' => 6, 'max_capacity' => 10],
            ['table_name' => 'Private Dining 2', 'min_capacity' => 8, 'max_capacity' => 12],
            ['table_name' => 'Outdoor Terrace 1', 'min_capacity' => 2, 'max_capacity' => 4],
            ['table_name' => 'Outdoor Terrace 2', 'min_capacity' => 2, 'max_capacity' => 4],
            ['table_name' => 'Outdoor Terrace 3', 'min_capacity' => 4, 'max_capacity' => 8],
            ['table_name' => 'Bar Area 1', 'min_capacity' => 2, 'max_capacity' => 4],
            ['table_name' => 'Bar Area 2', 'min_capacity' => 2, 'max_capacity' => 4],
            ['table_name' => 'Main Hall 1', 'min_capacity' => 4, 'max_capacity' => 8],
        ];

        foreach ($tables as $table) {
            $tableId = DB::table('tables')->insertGetId(array_merge($table, [
                'table_status' => 1,
                'extra_capacity' => 0,
                'is_joinable' => 0,
                'priority' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]));

            DB::table('locationables')->insert([
                'location_id' => $locationId,
                'locationable_id' => $tableId,
                'locationable_type' => 'tables',
            ]);
        }

        $this->line('  ✓ Created 14 tables');
    }

    protected function seedCategories(): void
    {
        $this->newLine();
        $this->info('Step 2: Creating menu categories...');

        if (DB::table('categories')->where('name', 'Starters')->exists()
            && DB::table('categories')->where('name', 'Set Menus')->exists()) {
            $this->line('  Categories already exist, skipping.');
            return;
        }

        $categories = [
            ['name' => 'Starters', 'priority' => 1],
            ['name' => 'Pasta & Risotto', 'priority' => 2],
            ['name' => 'Grilled & Roasted', 'priority' => 3],
            ['name' => 'Seafood', 'priority' => 4],
            ['name' => 'Sides', 'priority' => 5],
            ['name' => 'Desserts', 'priority' => 6],
            ['name' => 'Drinks', 'priority' => 7],
            ['name' => 'Set Menus', 'priority' => 8],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category['name'],
                'description' => '',
                'parent_id' => 0,
                'priority' => $category['priority'],
                'status' => 1,
                'nest_left' => 0,
                'nest_right' => 0,
                'permalink_slug' => Str::slug($category['name']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->info('  ✓ Created 8 menu categories');
    }

    protected function seedMenuOptions(): void
    {
        $this->newLine();
        $this->info('Step 3: Creating menu options...');

        if (DB::table('menu_options')->where('option_name', 'Size')->exists()
            && DB::table('menu_options')->where('option_name', 'Extras')->exists()
            && DB::table('menu_options')->where('option_name', 'Spice Level')->exists()) {
            $this->line('  Menu options already exist, skipping.');
            return;
        }

        // Option 1: Size (radio)
        $sizeOptionId = DB::table('menu_options')->insertGetId([
            'option_name' => 'Size',
            'display_type' => 'radio',
            'priority' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $sizeValues = [
            ['name' => 'Small', 'price' => 0, 'priority' => 1],
            ['name' => 'Large', 'price' => 5.00, 'priority' => 2],
        ];

        foreach ($sizeValues as $value) {
            DB::table('menu_option_values')->insert([
                'option_id' => $sizeOptionId,
                'name' => $value['name'],
                'price' => $value['price'],
                'priority' => $value['priority'],
            ]);
        }

        // Option 2: Extras (checkbox)
        $extrasOptionId = DB::table('menu_options')->insertGetId([
            'option_name' => 'Extras',
            'display_type' => 'checkbox',
            'priority' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $extrasValues = [
            ['name' => 'Extra Cheese', 'price' => 2.50, 'priority' => 1],
            ['name' => 'Extra Sauce', 'price' => 1.50, 'priority' => 2],
        ];

        foreach ($extrasValues as $value) {
            DB::table('menu_option_values')->insert([
                'option_id' => $extrasOptionId,
                'name' => $value['name'],
                'price' => $value['price'],
                'priority' => $value['priority'],
            ]);
        }

        // Option 3: Spice Level (radio)
        $spiceOptionId = DB::table('menu_options')->insertGetId([
            'option_name' => 'Spice Level',
            'display_type' => 'radio',
            'priority' => 3,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $spiceValues = [
            ['name' => 'Mild', 'price' => 0, 'priority' => 1],
            ['name' => 'Medium', 'price' => 0, 'priority' => 2],
            ['name' => 'Hot', 'price' => 0, 'priority' => 3],
        ];

        foreach ($spiceValues as $value) {
            DB::table('menu_option_values')->insert([
                'option_id' => $spiceOptionId,
                'name' => $value['name'],
                'price' => $value['price'],
                'priority' => $value['priority'],
            ]);
        }

        $this->info('  ✓ Created 3 menu options (Size, Extras, Spice Level)');

        $this->seedOptionValuesForOption($sizeOptionId, 'Size');
        $this->seedOptionValuesForOption($extrasOptionId, 'Extras');
        $this->seedOptionValuesForOption($spiceOptionId, 'Spice Level');
    }

    protected function seedOptionValuesForOption(int $optionId, string $optionName): void
    {
        // This method is used for documentation - actual seeding happens above
    }

    protected function seedMenuItems(): void
    {
        $this->newLine();
        $this->info('Step 4: Creating menu items...');

        if (DB::table('menus')->where('menu_name', 'Bruschetta al Pomodoro')->exists()) {
            $this->line('  Menu items already exist, skipping.');
            return;
        }

        $categoryIdStarters = DB::table('categories')->where('name', 'Starters')->value('category_id');
        $categoryIdPasta = DB::table('categories')->where('name', 'Pasta & Risotto')->value('category_id');
        $categoryIdGrilled = DB::table('categories')->where('name', 'Grilled & Roasted')->value('category_id');
        $categoryIdSeafood = DB::table('categories')->where('name', 'Seafood')->value('category_id');
        $categoryIdSides = DB::table('categories')->where('name', 'Sides')->value('category_id');
        $categoryIdDesserts = DB::table('categories')->where('name', 'Desserts')->value('category_id');
        $categoryIdDrinks = DB::table('categories')->where('name', 'Drinks')->value('category_id');
        $categoryIdSetMenus = DB::table('categories')->where('name', 'Set Menus')->value('category_id');

        $optionSizeId = DB::table('menu_options')->where('option_name', 'Size')->value('option_id');
        $optionExtrasId = DB::table('menu_options')->where('option_name', 'Extras')->value('option_id');
        $optionSpiceId = DB::table('menu_options')->where('option_name', 'Spice Level')->value('option_id');

        $menus = [
            // STARTERS (6 items)
            [
                'menu_name' => 'Bruschetta al Pomodoro',
                'menu_description' => 'Toasted sourdough topped with vine-ripened Maltese tomatoes, fresh basil, and extra virgin olive oil',
                'menu_price' => 7.50,
                'menu_status' => 1,
                'category_id' => $categoryIdStarters,
                'options' => [],
            ],
            [
                'menu_name' => 'Calamari Fritti',
                'menu_description' => 'Crispy fried squid rings served with lemon aioli and fresh parsley',
                'menu_price' => 9.95,
                'menu_status' => 1,
                'category_id' => $categoryIdStarters,
                'options' => [$optionSizeId],
            ],
            [
                'menu_name' => 'Maltese Ftira Bread',
                'menu_description' => 'Traditional Maltese bread served with local goat cheese, sun-dried tomatoes, and capers',
                'menu_price' => 6.95,
                'menu_status' => 1,
                'category_id' => $categoryIdStarters,
                'options' => [],
            ],
            [
                'menu_name' => 'Spicy Prawns',
                'menu_description' => 'Tiger prawns sautéed in garlic, chilli, and white wine sauce',
                'menu_price' => 12.50,
                'menu_status' => 1,
                'category_id' => $categoryIdStarters,
                'options' => [$optionSpiceId],
            ],
            [
                'menu_name' => 'Goat Cheese Salad',
                'menu_description' => 'Warm goat cheese on mixed leaves with honey walnut dressing and cranberries',
                'menu_price' => 8.95,
                'menu_status' => 1,
                'category_id' => $categoryIdStarters,
                'options' => [],
            ],
            [
                'menu_name' => 'Soup of the Day',
                'menu_description' => 'Freshly made soup of the day, served with crusty Maltese bread',
                'menu_price' => 5.95,
                'menu_status' => 1,
                'category_id' => $categoryIdStarters,
                'options' => [$optionSizeId],
            ],

            // PASTA & RISOTTO (6 items)
            [
                'menu_name' => 'Lobster Linguine',
                'menu_description' => 'Fresh linguine with lobster tail in a creamy tomato bisque sauce',
                'menu_price' => 28.95,
                'menu_status' => 0, // UNAVAILABLE
                'category_id' => $categoryIdPasta,
                'options' => [$optionSizeId],
            ],
            [
                'menu_name' => 'Seafood Risotto',
                'menu_description' => 'Creamy Arborio rice with mussels, clams, prawns, and saffron',
                'menu_price' => 19.95,
                'menu_status' => 1,
                'category_id' => $categoryIdPasta,
                'options' => [$optionSizeId],
            ],
            [
                'menu_name' => 'Penne Arrabbiata',
                'menu_description' => 'Penne pasta in a fiery tomato and chilli sauce with fresh basil',
                'menu_price' => 12.95,
                'menu_status' => 1,
                'category_id' => $categoryIdPasta,
                'options' => [$optionSpiceId, $optionExtrasId],
            ],
            [
                'menu_name' => 'Mushroom Tagliatelle',
                'menu_description' => 'Fresh tagliatelle with wild mushrooms, garlic, and parmesan cream sauce',
                'menu_price' => 14.95,
                'menu_status' => 1,
                'category_id' => $categoryIdPasta,
                'options' => [$optionExtrasId],
            ],
            [
                'menu_name' => 'Ravioli al Forno',
                'menu_description' => 'Baked ricotta and spinach ravioli in tomato sauce with mozzarella',
                'menu_price' => 13.95,
                'menu_status' => 1,
                'category_id' => $categoryIdPasta,
                'options' => [],
            ],
            [
                'menu_name' => 'Carbonara',
                'menu_description' => 'Spaghetti with crispy pancetta, egg yolk, pecorino, and black pepper',
                'menu_price' => 14.50,
                'menu_status' => 1,
                'category_id' => $categoryIdPasta,
                'options' => [$optionExtrasId],
            ],

            // GRILLED & ROASTED (6 items)
            [
                'menu_name' => 'Grilled Ribeye Steak',
                'menu_description' => '300g prime ribeye steak, grilled to your liking, with rosemary butter',
                'menu_price' => 32.95,
                'menu_status' => 1,
                'category_id' => $categoryIdGrilled,
                'options' => [$optionSizeId],
            ],
            [
                'menu_name' => 'Lamb Rack',
                'menu_description' => 'Herb-crusted rack of lamb with mint jus and roasted vegetables',
                'menu_price' => 29.95,
                'menu_status' => 1,
                'category_id' => $categoryIdGrilled,
                'options' => [],
            ],
            [
                'menu_name' => 'Chicken Marsala',
                'menu_description' => 'Pan-seared chicken breast in Marsala wine sauce with mushrooms',
                'menu_price' => 17.95,
                'menu_status' => 1,
                'category_id' => $categoryIdGrilled,
                'options' => [],
            ],
            [
                'menu_name' => 'Grilled Pork Chop',
                'menu_description' => 'Thick-cut pork chop with apple glaze and roasted sweet potato',
                'menu_price' => 19.95,
                'menu_status' => 1,
                'category_id' => $categoryIdGrilled,
                'options' => [$optionSpiceId],
            ],
            [
                'menu_name' => 'Slow-Roasted Shoulder of Lamb',
                'menu_description' => '12-hour slow-roasted lamb shoulder with garlic and rosemary',
                'menu_price' => 24.95,
                'menu_status' => 1,
                'category_id' => $categoryIdGrilled,
                'options' => [],
            ],
            [
                'menu_name' => 'Veal Chop',
                'menu_description' => 'Grilled veal chop with sage butter and seasonal greens',
                'menu_price' => 27.95,
                'menu_status' => 1,
                'category_id' => $categoryIdGrilled,
                'options' => [],
            ],

            // SEAFOOD (6 items)
            [
                'menu_name' => 'Grilled Octopus',
                'menu_description' => 'Tender octopus tentacle with capers, olives, and lemon dressing',
                'menu_price' => 18.95,
                'menu_status' => 1,
                'category_id' => $categoryIdSeafood,
                'options' => [],
            ],
            [
                'menu_name' => 'Pan-Seared Sea Bass',
                'menu_description' => 'Whole sea bass with fennel, cherry tomatoes, and white wine sauce',
                'menu_price' => 22.95,
                'menu_status' => 1,
                'category_id' => $categoryIdSeafood,
                'options' => [],
            ],
            [
                'menu_name' => 'Seafood Platter',
                'menu_description' => 'Sharing platter of grilled prawns, calamari, mussels, and fish of the day',
                'menu_price' => 39.95,
                'menu_status' => 1,
                'category_id' => $categoryIdSeafood,
                'options' => [$optionSizeId],
            ],
            [
                'menu_name' => 'Maltese Fish Pie',
                'menu_description' => 'Traditional Maltese fish pie with fresh catch of the day',
                'menu_price' => 16.95,
                'menu_status' => 1,
                'category_id' => $categoryIdSeafood,
                'options' => [],
            ],
            [
                'menu_name' => 'Prawn Linguine',
                'menu_description' => 'Linguine with tiger prawns, garlic, chilli, and cherry tomatoes',
                'menu_price' => 18.50,
                'menu_status' => 1,
                'category_id' => $categoryIdSeafood,
                'options' => [$optionSpiceId],
            ],
            [
                'menu_name' => 'Baked Salmon',
                'menu_description' => 'Atlantic salmon fillet with dill cream sauce and roasted asparagus',
                'menu_price' => 19.95,
                'menu_status' => 1,
                'category_id' => $categoryIdSeafood,
                'options' => [],
            ],

            // SIDES (5 items)
            [
                'menu_name' => 'Truffle Fries',
                'menu_description' => 'Crispy fries with truffle oil and parmesan shavings',
                'menu_price' => 5.95,
                'menu_status' => 1,
                'category_id' => $categoryIdSides,
                'options' => [],
            ],
            [
                'menu_name' => 'Garlic Bread',
                'menu_description' => 'Toasted ciabatta with garlic butter and fresh parsley',
                'menu_price' => 4.95,
                'menu_status' => 1,
                'category_id' => $categoryIdSides,
                'options' => [$optionExtrasId],
            ],
            [
                'menu_name' => 'Mixed Leaf Salad',
                'menu_description' => 'Fresh mixed leaves with cherry tomatoes and balsamic dressing',
                'menu_price' => 4.50,
                'menu_status' => 1,
                'category_id' => $categoryIdSides,
                'options' => [],
            ],
            [
                'menu_name' => 'Roasted Vegetables',
                'menu_description' => 'Seasonal Mediterranean vegetables with olive oil and herbs',
                'menu_price' => 5.50,
                'menu_status' => 1,
                'category_id' => $categoryIdSides,
                'options' => [],
            ],
            [
                'menu_name' => 'Coleslaw',
                'menu_description' => 'Creamy coleslaw with red and white cabbage, carrots, and apple',
                'menu_price' => 3.95,
                'menu_status' => 1,
                'category_id' => $categoryIdSides,
                'options' => [],
            ],

            // DESSERTS (5 items)
            [
                'menu_name' => 'Tiramisu',
                'menu_description' => 'Classic Italian tiramisu with mascarpone and espresso',
                'menu_price' => 8.95,
                'menu_status' => 1,
                'category_id' => $categoryIdDesserts,
                'options' => [],
            ],
            [
                'menu_name' => 'Panna Cotta',
                'menu_description' => 'Vanilla bean panna cotta with berry compote',
                'menu_price' => 7.95,
                'menu_status' => 1,
                'category_id' => $categoryIdDesserts,
                'options' => [],
            ],
            [
                'menu_name' => 'Chocolate Lava Cake',
                'menu_description' => 'Warm chocolate fondant with vanilla ice cream',
                'menu_price' => 9.50,
                'menu_status' => 1,
                'category_id' => $categoryIdDesserts,
                'options' => [],
            ],
            [
                'menu_name' => 'Maltese Imqaret',
                'menu_description' => 'Traditional Maltese date-filled pastries with honey',
                'menu_price' => 6.95,
                'menu_status' => 1,
                'category_id' => $categoryIdDesserts,
                'options' => [],
            ],
            [
                'menu_name' => 'Cheese Board',
                'menu_description' => 'Selection of local and Mediterranean cheeses with honey and bread',
                'menu_price' => 12.95,
                'menu_status' => 1,
                'category_id' => $categoryIdDesserts,
                'options' => [$optionSizeId],
            ],

            // DRINKS (5 items)
            [
                'menu_name' => 'Cisk Lager',
                'menu_description' => 'Traditional Maltese lager beer, 330ml',
                'menu_price' => 3.50,
                'menu_status' => 1,
                'category_id' => $categoryIdDrinks,
                'options' => [],
            ],
            [
                'menu_name' => 'House Wine (Red)',
                'menu_description' => 'Glass of local red wine',
                'menu_price' => 5.50,
                'menu_status' => 1,
                'category_id' => $categoryIdDrinks,
                'options' => [$optionSizeId],
            ],
            [
                'menu_name' => 'House Wine (White)',
                'menu_description' => 'Glass of local white wine',
                'menu_price' => 5.50,
                'menu_status' => 1,
                'category_id' => $categoryIdDrinks,
                'options' => [$optionSizeId],
            ],
            [
                'menu_name' => 'Soft Drink',
                'menu_description' => 'Coca-Cola, Sprite, or Fanta',
                'menu_price' => 2.50,
                'menu_status' => 1,
                'category_id' => $categoryIdDrinks,
                'options' => [],
            ],
            [
                'menu_name' => 'Espresso',
                'menu_description' => 'Single or double shot espresso',
                'menu_price' => 2.00,
                'menu_status' => 1,
                'category_id' => $categoryIdDrinks,
                'options' => [$optionSizeId],
            ],

            // SET MENUS (2 items, with minimum_qty > 1)
            [
                'menu_name' => 'Business Lunch Set',
                'menu_description' => 'Two-course lunch set: starter + main course. Includes house wine or soft drink.',
                'menu_price' => 24.95,
                'minimum_qty' => 2,
                'menu_status' => 1,
                'category_id' => $categoryIdSetMenus,
                'options' => [],
            ],
            [
                'menu_name' => 'Weekend Sharing Platter',
                'menu_description' => 'Family sharing platter for 4: mixed starters, grilled meats, seafood, and sides.',
                'menu_price' => 89.95,
                'minimum_qty' => 4,
                'menu_status' => 1,
                'category_id' => $categoryIdSetMenus,
                'options' => [],
            ],
        ];

        foreach ($menus as $menuData) {
            $options = $menuData['options'] ?? [];
            $categoryId = $menuData['category_id'] ?? null;
            unset($menuData['options'], $menuData['category_id']);

            $menuId = DB::table('menus')->insertGetId(array_merge($menuData, [
                'minimum_qty' => $menuData['minimum_qty'] ?? 1,
                'menu_priority' => 0,
                'order_restriction' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]));

            // Link category
            if ($categoryId) {
                DB::table('menu_categories')->insert([
                    'menu_id' => $menuId,
                    'category_id' => $categoryId,
                ]);
            }

            // Link options to menu item
            foreach ($options as $optionId) {
                $menuOptionId = DB::table('menu_item_options')->insertGetId([
                    'option_id' => $optionId,
                    'menu_id' => $menuId,
                    'is_required' => 0,
                    'priority' => 0,
                    'min_selected' => 0,
                    'max_selected' => 0,
                    'free_quantity' => 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $optionValues = DB::table('menu_option_values')
                    ->where('option_id', $optionId)
                    ->get();

                foreach ($optionValues as $optionValue) {
                    $menuOptionValueId = DB::table('menu_item_option_values')->insertGetId([
                        'menu_option_id' => $menuOptionId,
                        'option_value_id' => $optionValue->option_value_id,
                        'override_price' => $optionValue->price ?? 0,
                        'priority' => $optionValue->priority ?? 0,
                        'is_default' => 0,
                        'free_quantity' => 0,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    DB::table('menu_item_option_linked_values')->insert([
                        'menu_option_id' => $menuOptionId,
                        'menu_item_option_value_id' => $menuOptionValueId,
                    ]);
                }
            }
        }

        $this->info('  ✓ Created ' . count($menus) . ' menu items across 8 categories');
        $this->line('    - Lobster Linguine marked as unavailable');
        $this->line('    - Business Lunch Set (min 2) and Weekend Sharing Platter (min 4) as set menus');
    }

    protected function seedWorkingHours(): void
    {
        $this->newLine();
        $this->info('Step 5: Creating working hours...');

        $location = DB::table('locations')->where('location_name', 'Harbour Table')->first();
        if (!$location) {
            $this->error('  Location not found, skipping working hours.');
            return;
        }

        $existing = DB::table('working_hours')
            ->where('location_id', $location->location_id)
            ->count();

        if ($existing) {
            $this->line('  Working hours already exist, skipping.');
            return;
        }

        $hours = [];
        for ($day = 0; $day <= 6; $day++) {
            $hours[] = [
                'location_id' => $location->location_id,
                'type' => 'delivery',
                'weekday' => $day,
                'opening_time' => '11:30:00',
                'closing_time' => '22:30:00',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            $hours[] = [
                'location_id' => $location->location_id,
                'type' => 'collection',
                'weekday' => $day,
                'opening_time' => '11:30:00',
                'closing_time' => '22:30:00',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            $hours[] = [
                'location_id' => $location->location_id,
                'type' => 'reservation',
                'weekday' => $day,
                'opening_time' => '11:30:00',
                'closing_time' => '22:30:00',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('working_hours')->insert($hours);

        $this->info('  ✓ Created working hours (Mon-Sun, 11:30-22:30) for delivery, collection, and reservation');
    }

    protected function seedCustomers(): void
    {
        $this->newLine();
        $this->info('Step 6: Creating synthetic customers...');

        if (DB::table('customers')->count()) {
            $this->line('  Customers already exist, skipping.');
            return;
        }

        $customers = [
            ['first_name' => 'Maria', 'last_name' => 'Camilleri', 'email' => 'maria.camilleri@email.mt', 'telephone' => '+356 7912 3456'],
            ['first_name' => 'Joseph', 'last_name' => 'Vella', 'email' => 'joseph.vella@email.mt', 'telephone' => '+356 7923 4567'],
            ['first_name' => 'Anna', 'last_name' => 'Schembri', 'email' => 'anna.schembri@email.mt', 'telephone' => '+356 7934 5678'],
            ['first_name' => 'Mark', 'last_name' => 'Zammit', 'email' => 'mark.zammit@email.mt', 'telephone' => '+356 7945 6789'],
            ['first_name' => 'Lucia', 'last_name' => 'Grech', 'email' => 'lucia.grech@email.mt', 'telephone' => '+356 7956 7890'],
            ['first_name' => 'David', 'last_name' => 'Farrugia', 'email' => 'david.farrugia@email.mt', 'telephone' => '+356 7967 8901'],
            ['first_name' => 'Sarah', 'last_name' => 'Spiteri', 'email' => 'sarah.spiteri@email.mt', 'telephone' => '+356 7978 9012'],
            ['first_name' => 'Michael', 'last_name' => 'Borg', 'email' => 'michael.borg@email.mt', 'telephone' => '+356 7989 0123'],
            ['first_name' => 'Claudia', 'last_name' => 'Agius', 'email' => 'claudia.agius@email.mt', 'telephone' => '+356 7990 1234'],
            ['first_name' => 'Steven', 'last_name' => 'Micallef', 'email' => 'steven.micallef@email.mt', 'telephone' => '+356 7901 2345'],
        ];

        foreach ($customers as $customer) {
            $customerId = DB::table('customers')->insertGetId([
                'first_name' => $customer['first_name'],
                'last_name' => $customer['last_name'],
                'email' => $customer['email'],
                'password' => bcrypt('password'),
                'telephone' => $customer['telephone'],
                'address_id' => 0,
                'newsletter' => 1,
                'customer_group_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => now(),
                'updated_at' => now(),
                'status' => 1,
                'is_activated' => 1,
                'activated_at' => now(),
            ]);

            $this->seedCustomerAddress($customerId, $customer['first_name'], $customer['last_name']);
        }

        $this->info('  ✓ Created 10 synthetic customers with addresses');
    }

    protected function seedCustomerAddress(int $customerId, string $firstName, string $lastName): void
    {
        $streets = [
            'Triq ir-Repubblika',
            'Triq San Pawl',
            'Strait Street',
            'Triq il-Knisja',
            'Merchant Street',
            'Old Bakery Street',
            'Triq il-Mediterran',
            'West Street',
            'Triq Santa Marija',
            'Triq il-Vittmi',
        ];

        $streetsValletta = [
            'Triq ir-Repubblika',
            'Strait Street',
            'Merchant Street',
            'Old Bakery Street',
            'West Street',
        ];

        $addressId = DB::table('addresses')->insertGetId([
            'customer_id' => $customerId,
            'address_1' => $streets[array_rand($streets)] . ' ' . rand(1, 100),
            'address_2' => '',
            'city' => 'Valletta',
            'state' => 'Valletta',
            'postcode' => 'VLT ' . rand(1000, 9999),
            'country_id' => $this->getCountryId('Malta'),
        ]);

        DB::table('customers')
            ->where('customer_id', $customerId)
            ->update(['address_id' => $addressId]);
    }

    protected function seedOrders(): void
    {
        $this->newLine();
        $this->info('Step 7: Creating synthetic orders...');

        if (DB::table('orders')->count()) {
            $this->line('  Orders already exist, skipping.');
            return;
        }

        $location = DB::table('locations')->where('location_name', 'Harbour Table')->first();
        $customers = DB::table('customers')->get();
        $menuItems = DB::table('menus')->where('menu_status', 1)->get();

        if (!$location || $customers->isEmpty() || $menuItems->isEmpty()) {
            $this->error('  Missing required data (location, customers, or menus), skipping orders.');
            return;
        }

        $orderStatuses = DB::table('statuses')
            ->where('status_for', 'order')
            ->pluck('status_id');

        $orderTypes = ['delivery', 'collection'];
        $paymentMethods = ['cod', 'paypal', 'stripe'];

        for ($i = 0; $i < 25; $i++) {
            $customer = $customers->random();
            $orderDate = now()->subDays(rand(0, 30));
            $orderTime = sprintf('%02d:%02d:00', rand(11, 22), [0, 15, 30, 45][array_rand([0, 15, 30, 45])]);
            $orderType = $orderTypes[array_rand($orderTypes)];
            $statusId = $orderStatuses->random();

            $cartItems = [];
            $totalItems = 0;
            $orderTotal = 0;

            $numItems = rand(1, 4);
            $selectedMenus = $menuItems->random($numItems);

            foreach ($selectedMenus as $menu) {
                $quantity = rand(1, 3);
                $subtotal = $menu->menu_price * $quantity;
                $cartItems[] = [
                    'id' => $menu->menu_id,
                    'name' => $menu->menu_name,
                    'quantity' => $quantity,
                    'price' => $menu->menu_price,
                    'subtotal' => $subtotal,
                    'option_values' => [],
                ];
                $totalItems += $quantity;
                $orderTotal += $subtotal;
            }

            $orderId = DB::table('orders')->insertGetId([
                'customer_id' => $customer->customer_id,
                'first_name' => $customer->first_name,
                'last_name' => $customer->last_name,
                'email' => $customer->email,
                'telephone' => $customer->telephone,
                'location_id' => $location->location_id,
                'address_id' => $customer->address_id ?? 0,
                'cart' => serialize($cartItems),
                'total_items' => $totalItems,
                'comment' => $this->getRandomComment(),
                'payment' => $paymentMethods[array_rand($paymentMethods)],
                'order_type' => $orderType,
                'created_at' => $orderDate,
                'updated_at' => $orderDate,
                'order_time' => $orderTime,
                'order_date' => $orderDate->format('Y-m-d'),
                'order_total' => $orderTotal,
                'status_id' => $statusId,
                'ip_address' => '127.0.0.1',
                'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
                'assignee_id' => 0,
                'invoice_prefix' => 'HT-' . $orderDate->format('Ym') . '-',
                'invoice_date' => $orderDate,
                'hash' => Str::random(32),
                'processed' => 0,
                'status_updated_at' => $orderDate,
                'assignee_updated_at' => $orderDate,
                'order_time_is_asap' => rand(0, 1),
                'delivery_comment' => '',
            ]);

            foreach ($cartItems as $cartItem) {
                DB::table('order_menus')->insert([
                    'order_id' => $orderId,
                    'menu_id' => $cartItem['id'],
                    'name' => $cartItem['name'],
                    'quantity' => $cartItem['quantity'],
                    'price' => $cartItem['price'],
                    'subtotal' => $cartItem['subtotal'],
                    'option_values' => serialize($cartItem['option_values']),
                    'comment' => '',
                ]);
            }
        }

        $this->info('  ✓ Created 25 synthetic orders across last 30 days');
    }

    protected function seedReservations(): void
    {
        $this->newLine();
        $this->info('Step 8: Creating synthetic reservations...');

        if (DB::table('reservations')->count()) {
            $this->line('  Reservations already exist, skipping.');
            return;
        }

        $location = DB::table('locations')->where('location_name', 'Harbour Table')->first();
        $customers = DB::table('customers')->get();
        $tables = DB::table('tables')->get();

        if (!$location || $customers->isEmpty() || $tables->isEmpty()) {
            $this->error('  Missing required data, skipping reservations.');
            return;
        }

        $reservationStatuses = DB::table('statuses')
            ->where('status_for', 'reservation')
            ->pluck('status_id');

        $occasions = [0, 1, 2, 3];
        $times = ['12:00:00', '12:30:00', '13:00:00', '18:00:00', '18:30:00', '19:00:00', '19:30:00', '20:00:00', '20:30:00'];

        for ($i = 0; $i < 8; $i++) {
            $customer = $customers->random();
            $table = $tables->random();
            $reserveDate = now()->addDays(rand(1, 14));
            $guestNum = rand(2, min($table->max_capacity, 8));
            $reserveTime = $times[array_rand($times)];
            $statusId = $reservationStatuses->random();

            DB::table('reservations')->insert([
                'location_id' => $location->location_id,
                'table_id' => $table->table_id,
                'guest_num' => $guestNum,
                'occasion_id' => $occasions[array_rand($occasions)],
                'customer_id' => $customer->customer_id,
                'first_name' => $customer->first_name,
                'last_name' => $customer->last_name,
                'email' => $customer->email,
                'telephone' => $customer->telephone,
                'comment' => $this->getRandomReservationComment(),
                'reserve_time' => $reserveTime,
                'reserve_date' => $reserveDate->format('Y-m-d'),
                'created_at' => now(),
                'updated_at' => now(),
                'assignee_id' => 0,
                'ip_address' => '127.0.0.1',
                'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
                'status_id' => $statusId,
                'hash' => Str::random(32),
                'duration' => 120,
                'processed' => 0,
                'status_updated_at' => now(),
                'assignee_updated_at' => now(),
            ]);
        }

        $this->info('  ✓ Created 8 synthetic reservations across next 14 days');
    }

    protected function seedCoupons(): void
    {
        $this->newLine();
        $this->info('Step 9: Creating coupons...');

        if (DB::table('igniter_coupons')->count()) {
            $this->line('  Coupons already exist, skipping.');
            return;
        }

        DB::table('igniter_coupons')->insert([
            [
                'name' => 'Welcome Discount',
                'code' => 'WELCOME10',
                'type' => 'P', // Percentage
                'discount' => 10.0000,
                'min_total' => 0,
                'redemptions' => 0,
                'customer_redemptions' => 0,
                'description' => '10% off your first order',
                'status' => 1,
                'date_added' => now()->format('Y-m-d'),
                'validity' => 'forever',
                'fixed_date' => null,
                'fixed_from_time' => null,
                'fixed_to_time' => null,
                'period_start_date' => null,
                'period_end_date' => null,
                'recurring_every' => null,
                'recurring_from_time' => null,
                'recurring_to_time' => null,
                'order_restriction' => 0,
            ],
            [
                'name' => 'Lunch Deal',
                'code' => 'LUNCH15',
                'type' => 'F', // Fixed amount
                'discount' => 15.0000,
                'min_total' => 50.0000,
                'redemptions' => 0,
                'customer_redemptions' => 0,
                'description' => '€15 off orders over €50',
                'status' => 1,
                'date_added' => now()->format('Y-m-d'),
                'validity' => 'forever',
                'fixed_date' => null,
                'fixed_from_time' => null,
                'fixed_to_time' => null,
                'period_start_date' => null,
                'period_end_date' => null,
                'recurring_every' => null,
                'recurring_from_time' => null,
                'recurring_to_time' => null,
                'order_restriction' => 0,
            ],
        ]);

        $this->info('  ✓ Created 2 coupons (WELCOME10 and LUNCH15)');
    }

    protected function getCountryId(string $countryName): int
    {
        $country = DB::table('countries')
            ->where('country_name', $countryName)
            ->first();

        return $country ? $country->country_id : 222; // Default to Malta (222)
    }

    protected function getRandomComment(): string
    {
        $comments = [
            '',
            'Please leave at door',
            'Ring doorbell',
            'Extra napkins please',
            'No onions please',
            'Allergies: nuts',
            'Medium rare please',
            'Extra crispy',
            'Happy birthday!',
            '',
            '',
        ];

        return $comments[array_rand($comments)];
    }

    protected function getRandomReservationComment(): string
    {
        $comments = [
            '',
            'Anniversary dinner',
            'Birthday celebration',
            'Business dinner',
            'Window seat preferred',
            'Outdoor seating if possible',
            'Highchair needed',
            'Wheelchair accessible',
            '',
            '',
        ];

        return $comments[array_rand($comments)];
    }
}
