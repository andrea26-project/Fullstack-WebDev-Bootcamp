<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductVariantController extends Controller
{
    public function index(Product $product)
    {
        $variants = $product->variants()->latest()->get();

        return inertia('product/variant/index', [
            'product' => $product,
            'variants' => $variants,
        ]);
    }

    public function create(Product $product)
    {
        return inertia('product/variant/form', [
            'product' => $product
        ]);
    }

    public function store(Request $request, Product $product)
    {
        $data = $request->validate([
            'variant_name' => ['required', 'string'],
            'stock' => ['required', 'integer', 'min:0'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        $data['product_id'] = $product->id;

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('variant', 'public');
        }

        ProductVariant::create($data);

        return redirect()->route('products.variants.index', $product)->with('success', 'Variant created successfully.');
    }

    public function edit(Product $product, ProductVariant $variant)
    {
        return inertia('product/variant/form', [
            'product' => $product,
            'variant' => $variant,
        ]);
    }

    public function update(Request $request, Product $product, ProductVariant $variant)
    {
        $data = $request->validate([
            'variant_name' => ['required', 'string'],
            'stock' => ['required', 'integer', 'min:0'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            if ($variant->image && Storage::disk('public')->exists($variant->image)) {
                Storage::disk('public')->delete($variant->image);
            }
            $data['image'] = $request->file('image')->store('variant', 'public');
        }

        $variant->update($data);

        return redirect()->route('products.variants.index', $product)->with('success', 'Variant updated successfully.');
    }

    public function destroy(Product $product, ProductVariant $variant)
    {
        if ($variant->image && Storage::disk('public')->exists($variant->image)) {
            Storage::disk('public')->delete($variant->image);
        }

        $variant->delete();

        return redirect()->route('products.variants.index', $product)->with('success', 'Variant deleted successfully.');
    }
}
