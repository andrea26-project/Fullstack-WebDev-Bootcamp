<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category')->get();
        return inertia('product/index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return inertia('product/form', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data=$request->validate( [
            'name' => 'required|string|unique:products,name',
            'category_id' => 'required|exists:categories,id',
        'price' => 'required|numeric',
        'image' => 'required|image|max:2048',
        'description' => 'nullable|string'
        ]);

        $image_url = $request->file('image')->store('products', 'public');

        $data['image'] = $image_url;

        Product::create($data);

        return redirect()->route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
        return inertia('product/form', [
            'product' => $product,
'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, Product $product)
    // {
    //     $request->validate( [
    //         'name' => 'required|string|unique:products,name,' . $product->id,
    //         'category_id' => 'required|exists:categories,id',
    // 'price' => 'required|numeric',
    // 'company' => 'nullable|string',
    // 'description' => 'nullable|string'
    //     ]);

    //     if ($request->file('image')) {
    //         $image_url = $request->file('image')->store('products', 'public');
    //     $data['image'] = $image_url;
    //     }

    //     $product->update( $data);

    //     return redirect()->route('products.index');
    // }

    public function update(Request $request, Product $product)
{
    $data = $request->validate([
        'name' => 'required|string|unique:products,name,' . $product->id,
        'category_id' => 'required|exists:categories,id',
        'price' => 'required|numeric',
        'company' => 'nullable|string',
        'description' => 'nullable|string',
        'image' => 'nullable|image|max:2048',
    ]);

    if ($request->file('image')) {
        $image_url = $request->file('image')->store('products', 'public');
        $data['image'] = $image_url;
    }

    $product->update($data);

    return redirect()->route('products.index');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('products.index');
    }
}
