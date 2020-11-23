import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from django_hospital.hospital.models import Paciente, Caso

# Create a GraphQL type for the Paciente model
class PacienteType(DjangoObjectType):
    class Meta:
        model = Paciente

# Create a GraphQL type for the Caso model
class CasoType(DjangoObjectType):
    class Meta:
        model = Caso

# Create a Query type
class Query(ObjectType):
    paciente = graphene.Field(PacienteType, id=graphene.Int())
    caso = graphene.Field(CasoType, id=graphene.Int())
    pacientes = graphene.List(PacienteType)
    casos= graphene.List(CasoType)

    def resolve_paciente(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Paciente.objects.get(pk=id)

        return None

    def resolve_caso(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Caso.objects.get(pk=id)

        return None

    def resolve_pacientes(self, info, **kwargs):
        return Paciente.objects.all()

    def resolve_casos(self, info, **kwargs):
        return Caso.objects.all()

# Create Input Object Types
class PacienteInput(graphene.InputObjectType):
    id = graphene.ID()
    nombre = graphene.String()
    edad = graphene.Int()
    telefono = graphene.String()
    direccion = graphene.String()

class CasoInput(graphene.InputObjectType):
    id = graphene.ID()
    enfermedad = graphene.String()
    descripcion = graphene.String()
    pacientes = graphene.List(PacienteInput)
    fecha_entrada = graphene.Date()
    fecha_salida = graphene.Date()
    habitacion = graphene.String()

# Create mutations for Pacientes
class CreatePaciente(graphene.Mutation):
    class Arguments:
        input = PacienteInput(required=True)

    ok = graphene.Boolean()
    paciente = graphene.Field(PacienteType)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True
        paciente_instance = Paciente(nombre = input.nombre, edad = input.edad, telefono = input.telefono,
        direccion = input.direccion)
        paciente_instance.save()
        return CreatePaciente(ok=ok, paciente=paciente_instance)

class UpdatePaciente(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = PacienteInput(required=True)

    ok = graphene.Boolean()
    paciente = graphene.Field(PacienteType)

    @staticmethod
    def mutate(root, info, id, input=None):
        ok = False
        paciente_instance = Paciente.objects.get(pk=id)
        if paciente_instance:
            ok = True
            paciente_instance.nombre = input.nombre
            paciente_instance.edad = input.edad
            paciente_instance.telefono = input.telefono
            paciente_instance.direccion = input.direccion
            paciente_instance.save()
            return UpdatePaciente(ok=ok, paciente=paciente_instance)
        return UpdatePaciente(ok=ok, paciente=None)

#createPaciente(input: PacienteInput) : PacientePayload

# Create mutations for Casos
class CreateCaso(graphene.Mutation):
    class Arguments:
        input = CasoInput(required=True)

    ok = graphene.Boolean()
    caso = graphene.Field(CasoType)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True
        pacientes = []
        for paciente_input in input.pacientes:
            paciente = Paciente.objects.get(pk=paciente_input.id)
            if paciente is None:
                return CreateCaso(ok=False, caso=None)
            pacientes.append(paciente)
        caso_instance = Caso(
            enfermedad=input.enfermedad,
            descripcion=input.descripcion,
            fecha_entrada=input.fecha_entrada,
            fecha_salida=input.fecha_salida,
            habitacion=input.habitacion
        )
        caso_instance.save()
        caso_instance.pacientes.set(pacientes)
        return CreateCaso(ok=ok, caso=caso_instance)


class UpdateCaso(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = CasoInput(required=True)

    ok = graphene.Boolean()
    caso = graphene.Field(CasoType)

    @staticmethod
    def mutate(root, info, id, input=None):
        ok = False
        caso_instance = Caso.objects.get(pk=id)
        if caso_instance:
            ok = True
            pacientes = []
            for paciente_input in input.pacientes:
                paciente = Paciente.objects.get(pk=paciente_input.id)
                if paciente is None:
                    return UpdateCaso(ok=False, caso=None)
                pacientes.append(paciente)
            caso_instance.enfermedad=input.enfermedad
            caso_instance.descripcion=input.descripcion
            caso_instance.fecha_entrada=input.fecha_entrada
            caso_instance.fecha_salida=input.fecha_salida
            caso_instance.habitacion=input.habitacion
            caso_instance.save()
            caso_instance.pacientes.set(pacientes)
            return UpdateCaso(ok=ok, caso=caso_instance)
        return UpdateCaso(ok=ok, caso=None)

#class mutacion
class Mutation(graphene.ObjectType):
    create_paciente = CreatePaciente.Field()
    update_paciente = UpdatePaciente.Field()
    create_caso = CreateCaso.Field()
    update_caso = UpdateCaso.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)