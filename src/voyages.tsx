import {useEffect,useState} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
const voyages = () => {
    return(
        <div className="container-fluid">
        <Card className="mb-6">
        <CardContent>
            <h1>Gestion des voyages</h1>
          <h2 className="text-lg font-semibold mb-3">Ajouter un Voyage</h2>
          <form onSubmit={handleSubmit} className="flex gap-2">
          <Input type="number" id="passengers" min="1" value={passengers} onChange={(e) => setPassengers(e.target.value)}/>

            <Input name="name" placeholder="Nom" onChange={handleChange} />
            <Input name="destination" placeholder="Destination" onChange={handleChange} />
            <Input name="price" type="number" placeholder="Prix" onChange={handleChange} />
            <Button type="submit">Ajouter</Button>
          </form>
        </CardContent>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>gestion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trips.map((trip, index) => (
            <TableRow key={index}>
              <TableCell>{trip.name}</TableCell>
              <TableCell>{trip.destination}</TableCell>
              <TableCell>{trip.price} €</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    );
};
export default voyages;