<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    $categories = Category::latest()->get();

    return inertia('category/index', [
        'categories' => $categories,
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('category/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'unique:categories,name']
        ]);

        Category::create($data);

        return redirect()->route('categories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $category = Category::find($category->id);
        return response() -> json($category);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('category/form', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
       $data = $request->validate([
        'name' => ['required', "unique:categories,name,{$category->id}"]
       ]);

       $category->update($data);

       return redirect()->route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): RedirectResponse
    {
        if ($category->products()->exists()) {
            return back()->withErrors([
                'message' => 'Category masih digunakan oleh product, data tidak bisa dihapus.'
            ]);
        }

        $category->delete();

        return redirect()->route('categories.index');
    }
}
