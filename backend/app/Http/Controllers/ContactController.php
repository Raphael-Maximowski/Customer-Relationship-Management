<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return response()->json($contacts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'posicao' => 'required|integer',
            'name' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|string|email',
            'cpf' => 'required|string|max:14',
            'data_de_nascimento' => 'required|date',
            'endereco' => 'required|string',
            'value' => 'required|numeric',
            'step_id' => 'required|exists:steps,id',
        ]);

        $contact = Contact::create($request->all());
        return response()->json($contact, 201);
    }

    public function show($id)
    {
        $contact = Contact::findOrFail($id);
        return response()->json($contact);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'posicao' => 'required|integer',
            'name' => 'string|max:255',
            'phone' => 'string',
            'email' => 'string|email|max:255',
            'cpf' => 'string|max:14',
            'data_de_nascimento' => 'date',
            'endereco' => 'string|max:255',
            'value' => 'numeric',
            'step_id' => 'exists:steps,id',
        ]);

        $novaPosicao = $request->posicao;
        $contact = Contact::findOrFail($id);
        $step_id = $request->step_id;
        $posicaoAtual = $contact->posicao;
        if ($novaPosicao == $posicaoAtual) {
            return response()->json($contact);
        }
        $rest = Contact::where('step_id', $step_id)->orderBy('posicao')->get();
        for ($i = 0; $i < count($rest); $i++) {
            if ($rest[$i]->id == $id) {
                continue;
            }
            if ($posicaoAtual < $novaPosicao) {
                if ($rest[$i]->posicao > $posicaoAtual && $rest[$i]->posicao <= $novaPosicao) {
                    $rest[$i]->posicao--;
                    $rest[$i]->save();
                }
            } else {
                if ($rest[$i]->posicao >= $novaPosicao && $rest[$i]->posicao < $posicaoAtual) {
                    $rest[$i]->posicao++;
                    $rest[$i]->save();
                }
            }
        }
        $contact->update(['posicao' => $novaPosicao]);
        return response()->json($contact);
    }

    public function updateStep(Request $request, $id)
    {
        $request->validate([
            'posicao' => 'required|integer',
            'step_id' => 'exists:steps,id',
            'newStep_id' => 'exists:steps,id',
            'newPosition' => 'integer'
        ]);

        $stepId = $request->step_id;
        $newStep = $request->newStep;
        $newPosition = $request->newPosition;

        $contact = Contact::findOrFail($id);
        $oldPosition = $contact->posicao;
        $oldStep = $contact->step_id;

        if ($newStep == $oldStep) {
            if ($oldPosition != $newPosition) {
                $rest = Contact::where('step_id', $oldStep)->orderBy('posicao')->get();
                for ($i = 0; $i < count($rest); $i++) {
                    if ($rest[$i]->posicao > $oldPosition && $rest[$i]->posicao <= $newPosition) {
                        $rest[$i]->posicao--;
                        $rest[$i]->save();
                    } elseif ($rest[$i]->posicao >= $newPosition && $rest[$i]->posicao < $oldPosition) {
                        $rest[$i]->posicao++;
                        $rest[$i]->save();
                    }
                }
            }

            $contact->updateContact([
                'posicao' => $newPosition
            ]);

            return response()->json($contact);
        }

        $oldRest = Contact::where('step_id', $oldStep)->where('posicao', '>', $oldPosition)->orderBy('posicao')->get();
        for ($i = 0; $i < count($oldRest); $i++) {
            $oldRest[$i]->posicao--;
            $oldRest[$i]->save();
        }

        $newRest = Contact::where('step_id', $newStep)->where('posicao', '>=', $newPosition)->orderBy('posicao')->get();
        for ($i = 0; $i < count($newRest); $i++) {
            $newRest[$i]->posicao++;
            $newRest[$i]->save();
        }

        $contact->updateContact([
            'step_id' => $newStep,
            'posicao' => $newPosition
        ]);

        return response()->json($contact);
    }



    public function destroy($id)
    {
        Contact::destroy($id);
        return response()->json(null, 204);
    }

}
