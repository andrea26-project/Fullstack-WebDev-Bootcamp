<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    use HasUlids;
    protected $fillable = [
'user_id',
'address',
'phone',
'total',
'status',
'url',
'payment_method',
'payment_channel',
'postal_code',
'country'
    ];

    public function orderItem()
    {
        return $this->hasMany(OrderItem::class);
    }

public function user()
{
    return $this->belongsTo(User::class);
}

}
