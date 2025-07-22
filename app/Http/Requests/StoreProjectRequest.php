<?php

namespace App\Http\Requests;

use App\ProjectPrioriyEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:400'],
            'assignee' => ['required', 'integer', 'exists:users,id'],
            'priority' => ['required', 'string'],
            'startDate' => ['nullable', 'date'],
            'dueDate' => ['nullable', 'date', 'after:startDate'],
            'type' => ['required', 'array', 'min:1']
        ];
    }
}
