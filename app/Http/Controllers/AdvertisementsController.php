<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdvertisementRequest;
use App\Http\Resources\AdvertisementResource;
use App\Models\Advertisement;
use App\Models\Postcode;
use App\Models\Rubric;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
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
        
        // dd($validated['rubrics'], explode(',', $validated['rubrics']));
        $path = Storage::putFile('public', $request->file('img'));
    
        $validated['img'] = $path;

        Advertisement::create($validated)->rubrics()->attach(explode(',', $validated['rubrics']));
  
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
        Storage::delete($advertisement->img);
        $advertisement->bids()->delete();
        $advertisement->rubrics()->detach();
        $advertisement->delete();
        return response()->json([
            'advertisements' => Advertisement::all()
        ]);
    }

    function searchByDistance(Request $request){
        // dd($request->searchdistance);
        // $this->validateDistance(); //Validates distance input to avoid SQL Injection.
        $distance = $request->searchdistance;
        // Waar Auth::user staat postcode ophalen van user
        $userPostcode = Postcode::where('id', Auth::user()->postcode_id)->first();
        // dd($userPostcode->postcode);
        $enteredPostcode = Postcode::where('postcode', $userPostcode->postcode)->first();
        // dd($enteredPostcode);
        $postcodesWithinRange = $enteredPostcode->getPostcodesByDistance($distance); //Gets all postcodes (id) within range.
        $usersWithinRange = User::whereIn('postcode_id', $postcodesWithinRange)->get(); //Gets all users within this postcode range.
       
        $userIDs = new Collection();
        foreach($usersWithinRange as $user){
            $userIDs->push($user->id); //Creates new collection with only ID's of users within range for iteration.
        }
        
        $itemsWithinRange = new Collection();
        if($usersWithinRange->count() == 1){ //Different query needed for amount of users within range. Gets the items posted by these users.
            $itemsWithinRange = Advertisement::where('user_id', $userIDs)->orderByDESC('created_at')->get();
        } else if($usersWithinRange->count() > 1){
            $itemsWithinRange = Advertisement::whereIn('user_id', $userIDs)->orderByDESC('created_at')->get();
        }

        return response()->json([
            'advertisements' => $itemsWithinRange
        ]);

        // $rubrics = Rubric::get();
        // $view = View::make('item.overview', [
        //     'items' => $itemsWithinRange, 
        //     'categories' => $rubrics, 
        //     'enteredPostcode' => $enteredPostcode,
        //     'contentHeader' => "Searching by distance: ".$distance."km from ".$enteredPostcode->woonplaats]);
        // $sections = $view->renderSections();
        // return $sections['page'];
    }
}
