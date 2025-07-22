<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Service\GeminiAIService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AiController extends Controller
{
    public function query(Request $request)
    {
        $prompt = $request->string('prompt');

        if (empty($prompt)) {
            return response()->json(['error' => 'Prompt cannot be empty'], 400);
        }
        $schema = GeminiAIService::generateSchema();
        $sql = GeminiAIService::generateSQL($prompt, $schema);

        $sql = strip_tags($sql);
        return response()->json(['res' => $sql], 200);
        $sql = preg_replace('/^```sql\s*/i', '', $sql);
        $sql = trim($sql);
        return response()->json(['error' => $sql, 'sql' => json_decode($sql)], 200);
        $normalizedSql = strtolower(preg_replace('/\s+/', ' ', $sql));

        if (!str_starts_with($normalizedSql, 'select')) {
            return response()->json(['error' => 'Only SELECT statements are allowed'], 400);
        }

        return response()->json(['error' => $sql], 400);
        // $data = DB::select(DB::raw($sql));
        $data = DB::select($sql);

        return response()->json([
            'sql' => $sql,
            'result' => $data
        ]);
    }
}
