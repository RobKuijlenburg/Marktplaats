<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdvertisementRequest;
use App\Http\Resources\AdvertisementResource;
use App\Models\Advertisement;
use App\Models\Rubric;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AdvertisementsController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'advertisements' => AdvertisementResource::collection(Advertisement::orderBy('created_at', 'desc')->get())
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAdvertisementRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::id();
        dd($request->img);
        $path = Storage::putFile('public', $request->img);
    
        $validated['img'] = $path;

        Advertisement::create($validated)->rubrics()->attach($validated['rubrics']);
  
        return response()->json([
            'advertisements' => Advertisement::all()
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreAdvertisementRequest $request, Advertisement $advertisement)
    {
        $validated = $request->validated();
        
        $advertisement->update($validated);
      
        return response()->json([
            'advertisements' => Advertisement::all()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Advertisement $advertisement)
    {
        // Storage::delete($advertisement->img);
        // $advertisement->comments()->delete();
        $advertisement->bids()->delete();
        $advertisement->rubrics()->detach();
        $advertisement->delete();
        return response()->json([
            'advertisements' => Advertisement::all()
        ]);
    }
}
