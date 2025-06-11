<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return response()->json([
            'data' => $categories,
            'message' => 'get categories success',
            'error' => false,
        ], 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:categories,name',
        ]);

        $category = Category::create($data);

        return response()->json([
            'data' => $category,
            'message' => 'create category success',
            'error' => false,
        ], 201);
    }

    public function show(string $id)
    {
        $category = Category::find($id);

        return response()->json([
            'data' => $category ?? null,
            'message' => $category ? 'get category success' : 'category not found',
            'error' => !$category,
        ], $category ? 200 : 404);
    }

    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:categories,name,' . $category->id,
        ]);

        $category->update($data);

        return response()->json([
            'data' => $category,
            'message' => 'update category success',
            'error' => false,
        ], 200);
    }

    public function destroy(Category $category)
    {
        if ($category->products()->exists()) {
            return response()->json([
                'data' => null,
                'message' => 'this category has related products',
                'error' => true,
            ], 400);
        }

        $category->delete();

        return response()->json([
            'data' => null,
            'message' => 'delete category success',
            'error' => false,
        ], 200);
    }
}

