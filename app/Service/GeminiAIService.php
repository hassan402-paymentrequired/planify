<?php

namespace App\Service;

use Gemini\Laravel\Facades\Gemini;
use Google\GenerativeAI\GenerativeModel;
use Illuminate\Support\Facades\DB;

class GeminiAIService
{
    public static function generateSQL(string $prompt, string $schema)
    {
        $model =  Gemini::generativeModel(model: 'gemini-2.0-flash');

        $fullPrompt = <<<EOT
You're an AI Laravel backend assistant. Given this schema:

$schema

For the user's request: "$prompt"

1. Write a safe SQL SELECT query.
2. Then generate the equivalent Laravel Eloquent (read-only) code.
3. MUST BE A VALID JSON AS RESPONSE THAT CAN BE EASILY CONVERTED TO PHP ARRAY.

Return JSON like:
{
  "sql": "SELECT * FROM ...",
  "eloquent": "Model::where(...)->get();"
}
EOT;

// blocks.tremor.so
        $response = $model->generateContent($fullPrompt);

        return $response->text();
    }


    public static function generateSchema(): string
    {
        $tables = DB::select('SHOW TABLES');
        $schemaText = "";

        foreach ($tables as $table) {
            $tableName = array_values((array)$table)[0];
            $columns = DB::select("SHOW COLUMNS FROM `$tableName`");
            $columnNames = array_map(fn($col) => $col->Field, $columns);
            $schemaText .= "$tableName (" . implode(', ', $columnNames) . ")\n";
        }

        return $schemaText;
    }
}
