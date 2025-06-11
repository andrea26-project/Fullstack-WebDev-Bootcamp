<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ProductVariant extends Model
{
    protected $fillable = ['variant_name', 'product_id', 'stock', 'image'];

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
